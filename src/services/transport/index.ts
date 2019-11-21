import axios, {AxiosResponse} from "axios";
import {get} from "lodash";
import {EApiRoutes} from "./EApiRoutes";
import {
    IGetCalculationResultParams,
    ILoginParams,
    IGetTrialsParams,
    IInviteParams,
    IRegistrationParams
} from "./params";
import {
    IGetTrialsResponse,
    ICalculateResponse,
    IGetRolesResponse,
    IGetCategoriesResponse,
    IValidateToken,
    IGetUserInfoResponse,
    ILoginResponse
} from "./responses";

export class Transport {
    private static BASE_URL: string;
    private client = axios.create({baseURL: Transport.BASE_URL});
    config = require("./config/config.json");

    constructor() {
        Transport.BASE_URL = get(this.config, "url.base");
        const options = {baseURL: Transport.BASE_URL};
        this.client = axios.create(options);
    }

    async getUserInfo(id: string): Promise<AxiosResponse<IGetUserInfoResponse>> {
        return this.client.get(`${EApiRoutes.GET_USER_INFO}`.replace("{:uid}", id));
    }

    async login(params: ILoginParams): Promise<AxiosResponse<ILoginResponse>> {
        return this.client.post(EApiRoutes.LOGIN, params, {headers: {Authorization: 'test'}});
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
        return this.client.post(EApiRoutes.REGISTRATION, params);
    }

    private static getHeaderToken() {
        return {headers: {Authorization: localStorage.getItem("AccessToken")}};
    }
}