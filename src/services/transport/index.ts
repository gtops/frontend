    import axios, {AxiosError, AxiosResponse} from "axios";
import {get} from "lodash";
import {EApiRoutes} from "./EApiRoutes";
import {
    IGetCalculationResultParams,
    ILoginParams,
    IGetTrialsParams,
    IInviteParams,
    IRegistrationParams,
    IAddOrgParams,
    IEditOrgParams,
    IAddAdminParams,
    IAddEventParams,
    IAddSecretaryParams, ISportObjectPrams, IJudgePrams, IAddUserParams, IEditUserParams
} from "./params";
import {
    IGetTrialsResponse,
    ICalculateResponse,
    IGetRolesResponse,
    IGetCategoriesResponse,
    IValidateToken,
    IGetUserInfoResponse,
    ILoginResponse,
    IGetOrgsListResponse,
    IGetOrgEventsListResponse,
    IRefreshResponse,
    IGetSecretaries,
    IGetEventResponse, IGetEventResultsResponse,
    IGetOrgInfoResponse, IGetLocalAdminsResponse, IGetTeamsResponse, IGetEventParticipantsResponse,
    IGetTeamCoachesResponse, IGetUserProfileInfo, IGetTeamInfoResponse, IGetSportObjectResponse, IGetJudgesResponse,
    IGetTablesResponse, IGetEventTrialsResponse, IGetEventAddedTrialsResponse, IGetCurrentTableResponse,
    IGetUserResultResponse, IGetTrialResultResponse,
} from "./responses";
import {IGetUserEventsResponse} from "./responses/IGetUserEventsResponse";
import {UserStore} from "../../components/user-store";
import {EPath} from "../../EPath";
import {IAddEventTrialParams} from "./params";

export class Transport<T extends object = object> {
    private static BASE_URL: string;
    private client = axios.create({baseURL: Transport.BASE_URL});
    config = require("./config/config.json");

    constructor() {
        Transport.BASE_URL = get(this.config, "url.base");
        const options = {baseURL: Transport.BASE_URL};
        this.client = axios.create(options);

        axios.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('AccessToken');
                if (token) {
                    config.headers = {Authorization: token};
                    axios.defaults.headers.common['Authorization'] = token;
                } else {
                    window.location.replace(EPath.LOGIN);
                }
                return config;
            },
            async (error) => {
                return Promise.reject(error);
            });


        this.client.interceptors.response.use(
            (response: AxiosResponse) => {
                let newResponse = response;
                if (response.data == "") {
                    newResponse.data = []
                }
                return newResponse;
            },
            async (error: AxiosError) => {
                const status = error.response ? error.response.status : -1;
                const originalRequest = error.config;
                if (status == 401) {
                    this.refreshToken().then(response => {
                        UserStore.getInstance().token = response.data.accessToken;
                        UserStore.getInstance().refreshToken = response.data.refreshToken;
                        return axios(originalRequest);
                    }).catch(error => {
                        if (error.response.data.errors && error.response.data.errors[0] && error.response.data.errors[0].type === "UNAUTHENTICATED") {
                            window.location.replace(EPath.LOGIN);
                        }
                    });
                }
                return Promise.reject(error);
            },
        );
    }

    async getParticipantInfo(id: string): Promise<AxiosResponse<IGetUserInfoResponse>> {
        return this.client.get(`${EApiRoutes.GET_PARTICIPANT_INFO}`.replace("{:uid}", id));
    }

    async getAllEventResults(eventId: number): Promise<AxiosResponse<IGetEventResultsResponse>> {
        return this.client.get(`${EApiRoutes.ALL_RESULTS}`.replace("{:eventId}", eventId.toString()), Transport.getHeaderToken());
    }

    async getCSV(eventId: number): Promise<AxiosResponse<string>> {
        return this.client.get(`${EApiRoutes.GET_CSV}`.replace("{:eventId}", eventId.toString()), Transport.getHeaderToken());
    }

    async getUserProfileInfo(): Promise<AxiosResponse<IGetUserProfileInfo>> {
        return this.client.post(EApiRoutes.USER_INFO, {}, Transport.getHeaderToken());
    }

    async refreshToken(): Promise<AxiosResponse<IRefreshResponse>> {
        return this.client.post(EApiRoutes.REFRESH, {}, Transport.getHeaderRefreshToken());
    }

    async login(params: ILoginParams): Promise<AxiosResponse<ILoginResponse>> {
        return this.client.post(EApiRoutes.LOGIN, params);
    }

    async getTrials(params: IGetTrialsParams): Promise<AxiosResponse<IGetTrialsResponse>> {
        return this.client.get(
            `${EApiRoutes.GET_TRIALS}`
                .replace("{:age}", params.age.toString())
                .replace("{:gender}", params.gender.toString())
        );
    }

    async getCategories(): Promise<AxiosResponse<IGetCategoriesResponse[]>> {
        return this.client.get(EApiRoutes.GET_CATEGORIES);
    }

    async getCalculationResult(params: IGetCalculationResultParams): Promise<AxiosResponse<ICalculateResponse>> {
        return this.client.get(
            `${EApiRoutes.GET_CALCULATED_RESULT}`
                .replace("{:firstResult}", params.primary_result.toString())
                .replace("{:trialId}", params.trial_id.toString())
        );
    }

    async getRoles(): Promise<AxiosResponse<IGetRolesResponse>> {
        return this.client.get(EApiRoutes.GET_ROLES);
    }

    async inviteUser(params: IInviteParams): Promise<AxiosResponse> {
        return this.client.post(EApiRoutes.INVITE, params, Transport.getHeaderToken());
    }

    async validateToken(): Promise<AxiosResponse<IValidateToken>> {
        return this.client.post(EApiRoutes.VALIDATE_TOKEN, {token: localStorage.getItem("AccessToken")});
    }

    async register(params: IRegistrationParams): Promise<AxiosResponse> {
        return this.client.post(EApiRoutes.REGISTRATION, params, Transport.getHeaderToken());
    }

    //Organization
    async inviteOrg(params: IAddOrgParams): Promise<AxiosResponse> {
        return this.client.post(EApiRoutes.ORGANIZATIONS, params, Transport.getHeaderToken());
    }

    async getOrgsList(): Promise<AxiosResponse<IGetOrgsListResponse[]>> {
        return this.client.get(EApiRoutes.ORGANIZATIONS);
    }

    async deleteOrg(id: number): Promise<AxiosResponse> {
        return this.client.delete(`${EApiRoutes.ORGANIZATION}`.replace("{:id}", id.toString()), Transport.getHeaderToken());
    }

    async editOrgInfo(params: IEditOrgParams, id: number): Promise<AxiosResponse> {
        return this.client.put(`${EApiRoutes.ORGANIZATION}`.replace("{:id}", id.toString()), params, Transport.getHeaderToken());
    }

    async getOrgInfo(id: number): Promise<AxiosResponse<IGetOrgInfoResponse>> {
        return this.client.get(`${EApiRoutes.ORGANIZATION}`.replace("{:id}", id.toString()), Transport.getHeaderToken());
    }

    //LocalAdmin
    async addLocalAdmin(params: IAddAdminParams, id: number): Promise<AxiosResponse> {
        return this.client.post(`${EApiRoutes.ADMIN}`.replace("{:id}", id.toString()), params, Transport.getHeaderToken());
    }

    async addExistingLocalAdmin(email: string, id: number): Promise<AxiosResponse> {
        return this.client.post(`${EApiRoutes.ADMIN_EXIST}`.replace("{:id}", id.toString()), {email: email}, Transport.getHeaderToken());
    }

    async getLocalAdmins(id: number): Promise<AxiosResponse<IGetLocalAdminsResponse[]>> {
        return this.client.get(`${EApiRoutes.ORG_ADMINS}`.replace("{:id}", id.toString()), Transport.getHeaderToken());
    }

    async removeLocalAdmins(orgId: number, idLocalAdmin: number): Promise<AxiosResponse> {
        return this.client.delete(
            `${EApiRoutes.ORG_ADMIN}`
                .replace("{:orgId}", orgId.toString())
                .replace("{:idLocalAdmin}", idLocalAdmin.toString()),
            Transport.getHeaderToken()
        );
    }

    //Event
    async addEvent(params: IAddEventParams, id: number): Promise<AxiosResponse> {
        return this.client.post(`${EApiRoutes.EVENTS}`.replace("{:id}", id.toString()), params, Transport.getHeaderToken());
    }

    async editEvent(params: IAddEventParams, orgId: number, eventId: number): Promise<AxiosResponse> {
        return this.client.put(EApiRoutes.EVENT
                .replace("{:orgId}", orgId.toString())
                .replace("{:eventId}", eventId.toString()),
            params, Transport.getHeaderToken()
        );
    }

    async getUserEvents(): Promise<AxiosResponse<IGetUserEventsResponse[]>> {
        return this.client.get(EApiRoutes.USER_EVENTS, Transport.getHeaderToken());
    }

    async getSecretaryEvents(): Promise<AxiosResponse<IGetUserEventsResponse[]>> {
        return this.client.get(EApiRoutes.SECRETARY_EVENTS, Transport.getHeaderToken());
    }

    async getOrgEventsList(id: number): Promise<AxiosResponse<IGetOrgEventsListResponse[]>> {
        return this.client.get(`${EApiRoutes.EVENTS}`.replace("{:id}", id.toString()));
    }

    async getEventAddedTrials(eventId: number): Promise<AxiosResponse<IGetEventAddedTrialsResponse[]>> {
        return this.client.get(EApiRoutes.GET_EVENT_ADDED_TRIALS.replace("{:eventId}", eventId.toString()));
    }

    async removeEventTrial(trialInEventId: number): Promise<AxiosResponse<IGetEventAddedTrialsResponse[]>> {
        return this.client.delete(
            EApiRoutes.REMOVE_EVENT_TRIAL.replace("{:trialInEventId}", trialInEventId.toString()),
            Transport.getHeaderToken()
        );
    }

    async getCurrentTable(eventId: number): Promise<AxiosResponse<IGetCurrentTableResponse>> {
        return this.client.get(EApiRoutes.GET_CURRENT_EVENT_TABLE.replace("{:eventId}", eventId.toString()));
    }

    async getEventTrials(eventId: number): Promise<AxiosResponse<IGetEventTrialsResponse[]>> {
        return this.client.get(EApiRoutes.GET_EVENT_TRIALS.replace("{:eventId}", eventId.toString()));
    }

    async addEventTrial(eventId: number, params: IAddEventTrialParams): Promise<AxiosResponse> {
        return this.client.post(
            EApiRoutes.ADD_EVENT_TRIAL.replace("{:eventId}", eventId.toString()),
            params,
            Transport.getHeaderToken()
        );
    }

    async changeEventStatus(eventId: number): Promise<AxiosResponse> {
        return this.client.post(
            EApiRoutes.CHANGE_EVENT_STATUS.replace("{:eventId}", eventId.toString()),
            {},
            Transport.getHeaderToken()
        );
    }

    async getEvent(orgId: number, eventId: number): Promise<AxiosResponse<IGetEventResponse>> {
        return this.client.get(`${EApiRoutes.EVENT}`
            .replace("{:orgId}", orgId.toString())
            .replace("{:eventId}", eventId.toString())
        );
    }

    async addJudgeInTrial(trialInEventId: number, refereeInOrganizationId: number): Promise<AxiosResponse<IGetEventResponse>> {
        return this.client.post(EApiRoutes.ADD_JUDGE_IN_TRIAL
                .replace("{:trialInEventId}", trialInEventId.toString())
                .replace("{:refereeInOrganizationId}", refereeInOrganizationId.toString()),
            {},
            Transport.getHeaderToken()
        );
    }

    async removeEvent(orgId: number, eventId: number): Promise<AxiosResponse> {
        return this.client.delete(
            `${EApiRoutes.EVENT}`
                .replace("{:orgId}", orgId.toString())
                .replace("{:eventId}", eventId.toString()),
            Transport.getHeaderToken()
        );
    }

    async userEventRequest(eventId: number): Promise<AxiosResponse> {
        return this.client.post(`${EApiRoutes.EVENT_REQUEST}`.replace("{:eventId}", eventId.toString()), {}, Transport.getHeaderToken());
    }

    async cancelUserEventRequest(eventId: number): Promise<AxiosResponse> {
        return this.client.post(EApiRoutes.CANCEL_REQUEST.replace("{:eventId}", eventId.toString()), {}, Transport.getHeaderToken());
    }

    async getEventParticipants(eventId: number): Promise<AxiosResponse<IGetEventParticipantsResponse[]>> {
        return this.client.get(`${EApiRoutes.EVENT_PARTICIPANTS}`.replace("{:eventId}", eventId.toString()), Transport.getHeaderToken());
    }

    async removeParticipant(participantId: number): Promise<AxiosResponse<IGetEventParticipantsResponse[]>> {
        return this.client.delete(
            `${EApiRoutes.EVENT_PARTICIPANT}`.replace("{:participantId}", participantId.toString()), Transport.getHeaderToken()
        );
    }

    async removeCoach(coachId: number): Promise<AxiosResponse<IGetEventParticipantsResponse[]>> {
        return this.client.delete(EApiRoutes.COACH.replace("{:teamLeadId}", coachId.toString()), Transport.getHeaderToken()
        );
    }

    async applyUserEventRequest(participantId: number): Promise<AxiosResponse> {
        return this.client.post(
            `${EApiRoutes.EVENT_PARTICIPANT}`.replace("{:participantId}", participantId.toString()), {}, Transport.getHeaderToken()
        );
    }

    //Secretary
    async addSecretary(params: IAddSecretaryParams, orgId: number, eventId: number): Promise<AxiosResponse> {
        return this.client.post(
            `${EApiRoutes.SECRETARY}`
                .replace("{:orgId}", orgId.toString())
                .replace("{:eventId}", eventId.toString()),
            params, Transport.getHeaderToken()
        );
    }

    async addExistingSecretary(email: string, orgId: number): Promise<AxiosResponse> {
        return this.client.post(
            `${EApiRoutes.SECRETARY_EXIST}`
                .replace("{:orgId}", orgId.toString()),
            {email: email}, Transport.getHeaderToken()
        );
    }

    async removeSecretary(orgId: number, eventId: number, secretaryId: number): Promise<AxiosResponse> {
        return this.client.delete(
            `${EApiRoutes.REMOVE_SECRETARY}`
                .replace("{:orgId}", orgId.toString())
                .replace("{:eventId}", eventId.toString())
                .replace("{:secretaryId}", secretaryId.toString()),
            Transport.getHeaderToken()
        );
    }

    async removeSecretaryFromOrg(orgId: number, secretaryId: number): Promise<AxiosResponse> {
        return this.client.delete(
            EApiRoutes.REMOVE_SECRETARY_FROM_ORG
                .replace("{:orgId}", orgId.toString())
                .replace("{:secretaryId}", secretaryId.toString()),
            Transport.getHeaderToken()
        );
    }

    async getSecretaries(orgId: number, eventId: number): Promise<AxiosResponse<IGetSecretaries[]>> {
        return this.client.get(
            `${EApiRoutes.SECRETARY}`
                .replace("{:orgId}", orgId.toString())
                .replace("{:eventId}", eventId.toString()),
            Transport.getHeaderToken()
        );
    }

    async getSecretariesCatalog(orgId: number): Promise<AxiosResponse<IGetSecretaries[]>> {
        return this.client.get(EApiRoutes.ORG_SECRETARY_CATALOG.replace("{:orgId}", orgId.toString()),
            Transport.getHeaderToken()
        );
    }

    async addSecretaryInEvent(orgId: number, eventId: number, secretaryOnOrganizationId: number): Promise<AxiosResponse> {
        return this.client.post(EApiRoutes.ADD_SECRETARY_IN_EVENT
                .replace("{:orgId}", orgId.toString())
                .replace("{:eventId}", eventId.toString())
                .replace("{:secretaryOnOrganizationId}", secretaryOnOrganizationId.toString()), {},
            Transport.getHeaderToken()
        );
    }

    //Teams
    async addTeam(name: string, orgId: number, eventId: number): Promise<AxiosResponse> {
        return this.client.post(
            `${EApiRoutes.TEAMS}`
                .replace("{:orgId}", orgId.toString())
                .replace("{:eventId}", eventId.toString()),
            {name},
            Transport.getHeaderToken()
        );
    }

    async getTeams(orgId: number, eventId: number): Promise<AxiosResponse<IGetTeamsResponse[]>> {
        return this.client.get(
            `${EApiRoutes.TEAMS}`
                .replace("{:orgId}", orgId.toString())
                .replace("{:eventId}", eventId.toString()),
            Transport.getHeaderToken()
        );
    }

    async getUserTeams(): Promise<AxiosResponse<IGetTeamsResponse[]>> {
        return this.client.get(EApiRoutes.COACH_TEAMS, Transport.getHeaderToken());
    }

    async getTeamCoaches(teamId: number): Promise<AxiosResponse<IGetTeamCoachesResponse[]>> {
        return this.client.get(EApiRoutes.TEAM_COACHES.replace("{:teamId}", teamId.toString()));
    }

    async getTeamParticipants(teamId: number): Promise<AxiosResponse<IGetEventParticipantsResponse[]>> {
        return this.client.get(EApiRoutes.TEAM_PARTICIPANT.replace("{:teamId}", teamId.toString()));
    }

    async addTeamParticipant(teamId: number, email: string): Promise<AxiosResponse> {
        return this.client.post(EApiRoutes.TEAM_PARTICIPANT.replace("{:teamId}", teamId.toString()), {email}, Transport.getHeaderToken());
    }

    async editTeamParticipant(participantId: number, params: IEditUserParams): Promise<AxiosResponse> {
        return this.client.put(
            EApiRoutes.EDIT_PARTICIPANT
                .replace("{:participantId}", participantId.toString()),
            params,
            Transport.getHeaderToken()
        );
    }

    async addPersonalParticipant(id: number, email: string): Promise<AxiosResponse> {
        return this.client.post(EApiRoutes.EVENT_PARTICIPANTS.replace("{:eventId}", id.toString()), {email}, Transport.getHeaderToken());
    }

    async addCoach(teamId: number, email: string): Promise<AxiosResponse> {
        return this.client.post(EApiRoutes.TEAM_COACHES.replace("{:teamId}", teamId.toString()), {email}, Transport.getHeaderToken());
    }

    async getTeamInfo(teamId: number): Promise<AxiosResponse<IGetTeamInfoResponse>> {
        return this.client.get(EApiRoutes.TEAM.replace("{:teamId}", teamId.toString()));
    }

    async editTeamInfo(teamId: number, name: string): Promise<AxiosResponse<IGetTeamInfoResponse>> {
        return this.client.put(EApiRoutes.TEAM.replace("{:teamId}", teamId.toString()), {name}, Transport.getHeaderToken());
    }

    async acceptAllTeam(teamId: number): Promise<AxiosResponse> {
        return this.client.post(EApiRoutes.TEAM_ACCEPT.replace("{:teamId}", teamId.toString()), {}, Transport.getHeaderToken());
    }

    async removeTeam(teamId: number): Promise<AxiosResponse> {
        return this.client.delete(EApiRoutes.TEAM.replace("{:teamId}", teamId.toString()), Transport.getHeaderToken());
    }

    //Sport objects
    async addSportObject(orgId: number, params: ISportObjectPrams): Promise<AxiosResponse> {
        return this.client.post(EApiRoutes.SPORT_OBJECT.replace("{:orgId}", orgId.toString()), params, Transport.getHeaderToken());
    }

    async getSportObject(orgId: number): Promise<AxiosResponse<IGetSportObjectResponse[]>> {
        return this.client.get(EApiRoutes.SPORT_OBJECT.replace("{:orgId}", orgId.toString()), Transport.getHeaderToken());
    }

    async editSportObject(orgId: number, objectId: number, params: ISportObjectPrams): Promise<AxiosResponse> {
        return this.client.post(
            EApiRoutes.SPORT_OBJECT_ITEM
                .replace("{:orgId}", orgId.toString())
                .replace("{:sportObjectId}", objectId.toString()),
            params,
            Transport.getHeaderToken()
        );
    }

    async removeSportObject(orgId: number, objectId: number): Promise<AxiosResponse> {
        return this.client.delete(
            EApiRoutes.SPORT_OBJECT_ITEM
                .replace("{:orgId}", orgId.toString())
                .replace("{:sportObjectId}", objectId.toString()),
            Transport.getHeaderToken()
        );
    }

    //Judges
    async addJudge(orgId: number, email: string): Promise<AxiosResponse> {
        return this.client.post(EApiRoutes.JUDGES.replace("{:orgId}", orgId.toString()), {email}, Transport.getHeaderToken());
    }

    async getJudges(orgId: number): Promise<AxiosResponse<IGetJudgesResponse[]>> {
        return this.client.get(EApiRoutes.JUDGES.replace("{:orgId}", orgId.toString()), Transport.getHeaderToken());
    }

    async removeJudge(orgId: number, judgeId: number): Promise<AxiosResponse> {
        return this.client.delete(
            EApiRoutes.REMOVE_JUDGE
                .replace("{:orgId}", orgId.toString())
                .replace("{:judgeId}", judgeId.toString()),
            Transport.getHeaderToken()
        );
    }

    async removeJudgeFromEvent(judgeId: number): Promise<AxiosResponse> {
        return this.client.delete(
            EApiRoutes.REMOVE_JUDGE_FROM_TRIAL.replace("{:judgeId}", judgeId.toString()),
            Transport.getHeaderToken()
        );
    }

    //Tables
    async getTables(): Promise<AxiosResponse<IGetTablesResponse[]>> {
        return this.client.get(EApiRoutes.TABLES);
    }

    async addTable(eventId: number, tableId: number): Promise<AxiosResponse> {
        return this.client.post(
            EApiRoutes.ADD_TABLE
                .replace("{:eventId}", eventId.toString())
                .replace("{:tableId}", tableId.toString()),
            {},
            Transport.getHeaderToken()
        );
    }

    //Result
    async getUserResult(userId: number, eventId: number): Promise<AxiosResponse<IGetUserResultResponse>> {
        return this.client.get(EApiRoutes.GET_USER_RESULT
                .replace("{:userId}", userId.toString())
                .replace("{:eventId}", eventId.toString()),
            Transport.getHeaderToken()
        );
    }

    async getTrialResult(trialInEventId: number): Promise<AxiosResponse<IGetTrialResultResponse>> {
        return this.client.get(EApiRoutes.GET_TRIAL_RESULT.replace("{:trialInEventId}", trialInEventId.toString()),
            Transport.getHeaderToken()
        );
    }

    async updateUserTrialResult(trialInEventId: number, firstResult: string): Promise<AxiosResponse> {
        return this.client.put(EApiRoutes.PUT_FIRST_RESULT.replace("{:resultTrialInEventId}", trialInEventId.toString()),
            {firstResult}, Transport.getHeaderToken()
        );
    }

    private static getHeaderToken() {
        return {headers: {Authorization: localStorage.getItem("AccessToken")}};
    }

    private static getHeaderRefreshToken() {
        return {headers: {Authorization: localStorage.getItem("RefreshToken")}};
    }
}