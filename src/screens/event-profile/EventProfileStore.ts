import {Store} from "../../components/store";
import {autobind} from "core-decorators";
import {observable} from "mobx";
import {AxiosError, AxiosResponse} from "axios";
import {
    IGetEventParticipantsResponse, IGetEventResponse, IGetOrgEventsListResponse, IGetSecretaries,
    IGetTeamsResponse
} from "../../services/transport/responses";
import {ITableData} from "../../components/table";
import {UserStore} from "../../components/user-store";
import {EFormTypes} from "../../EFormTypes";
import {IGetUserEventsResponse} from "../../services/transport/responses/IGetUserEventsResponse";

@autobind
export class EventProfileStore extends Store {
    @observable orgId = -1;
    @observable eventId = -1;
    @observable isVisible = false;
    @observable isAddTeamFormVisible = false;
    @observable isPopupVisible = false;
    @observable popupText = "";
    @observable teamName = "";
    @observable isParticipant = true;
    @observable isConfirmed = true;
    @observable event: IGetEventResponse = {
        id: -1,
        organizationId: -1,
        name: "",
        startDate: "",
        expirationDate: "",
        description: "",
        status: ""
    };

    @observable secretariesData: ITableData[] = [];
    @observable teamsData: ITableData[] = [];
    @observable participantData: ITableData[] = [];
    @observable formType = EFormTypes.USER;
    @observable canEditEvent = false;

    onSuccessGetSecretaries(response: AxiosResponse<IGetSecretaries[]>): void {
        console.log("[EventProfileStore.onSuccessGetSecretaries]: ", response);
        this.secretariesData = response.data.map(item => {
            return (
                {
                    isVisible: true,
                    data: item
                }
            )
        });
    }

    onSuccessGetTeams(response: AxiosResponse<IGetTeamsResponse[]>): void {
        console.log("[EventProfileStore.onSuccessGetTeams]: ", response);
        this.teamsData = response.data.map(item => {
            return (
                {
                    isVisible: true,
                    data: item
                }
            )
        });
    }

    onSuccessGetEvent(response: AxiosResponse<IGetEventResponse>): void {
        console.log("[EventProfileStore.onSuccessGetEvent]: ", response);
        this.event = response.data;
    }

    onSuccessGetUserEvents(response: AxiosResponse<IGetUserEventsResponse[]> | AxiosResponse<IGetOrgEventsListResponse[]>): void {
        response.data.forEach((value: IGetUserEventsResponse | IGetOrgEventsListResponse) => {
            if (value.id == this.eventId) {
                this.canEditEvent = true;
            }
        })
    }

    onSuccessDeleteSecretary(response: AxiosResponse): void {
        console.log("[EventProfileStore.onSuccessDeleteSecretary]: ", response);
    }

    onSuccessAccept(response: AxiosResponse): void {
        console.log("[EventProfileStore.onSuccessAccept]: ", response);
    }

    onSuccessSendEventRequest(response: AxiosResponse): void {
        console.log("[EventProfileStore.onSuccessSendEventRequest]: ", response);
        this.isError = false;
        this.popupText = "Заявка успешно отправлена и будет рассмотрена.";
        this.isPopupVisible = true;
    }

    onSuccessAddTeam(response: AxiosResponse): void {
        console.log("[EventProfileStore.onSuccessAddTeam]: ", response);
        this.isError = false;
        this.teamName = "";
        this.isPopupVisible = true;
        this.popupText = "Команда успешно добавлена.";
    }



    onErrorImpl(error: string | AxiosError): void {
        let errText = '';

        if (typeof error === "string") {
            errText = error
        } else {
            let errors = error.response ? error.response.data.errors : [];
            errText = errors && errors.length > 0 ? errors[0].description : "";
        }

        this.isError = true;
        this.popupText = `Произошла ошибка. Статус: ${errText}`;
        this.isPopupVisible = true;
    }

    onSuccessGetEventParticipants(response: AxiosResponse<IGetEventParticipantsResponse[]>): void {
        console.log("[EventProfileStore.onSuccessGetEventParticipants]: ", response);
        this.isParticipant = false;
        this.participantData = response.data.map(item => {
            if (item.userId == UserStore.getInstance().id) {
                this.isParticipant = true;
                this.isConfirmed = item.isConfirmed;
            }
            return (
                {
                    isVisible: true,
                    data: {
                        _isConfirmed: item.isConfirmed ? "подтвержден" : "не подтвержден",
                        ...item
                    }
                }
            )
        }).filter(value => value.data.teamId === null)
    }
}