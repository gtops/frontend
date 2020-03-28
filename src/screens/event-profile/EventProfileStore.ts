import {Store} from "../../components/store";
import {autobind} from "core-decorators";
import {observable} from "mobx";
import {AxiosError, AxiosResponse} from "axios";
import {
    IGetEventParticipantsResponse, IGetEventResponse, IGetSecretaries,
    IGetTeamsResponse
} from "../../services/transport/responses";
import {ITableData} from "../../components/table";
import {UserStore} from "../../components/user-store";

@autobind
export class EventProfileStore extends Store {
    @observable orgId = -1;
    @observable eventId = -1;
    @observable isVisible = false;
    @observable isAddTeamFormVisible = false;
    @observable isPopupVisible = false;
    @observable popupText = "";
    @observable teamName = "";
    @observable isParticipant = false;
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

    onSuccessDeleteSecretary(response: AxiosResponse): void {
        console.log("[EventProfileStore.onSuccessDeleteSecretary]: ", response);
    }

    onSuccessAccept(response: AxiosResponse): void {
        console.log("[EventProfileStore.onSuccessAccept]: ", response);
    }

    onSuccessSendEventRequest(response: AxiosResponse): void {
        console.log("[EventProfileStore.onSuccessSendEventRequest]: ", response);
        this.isError = false;
        this.popupText = "Заявка успешно отправлена и будет расммотрена.";
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
        this.participantData = response.data.map(item => {
            if (item.userId == UserStore.getInstance().id) {
                this.isParticipant = true;
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
        });
    }
}