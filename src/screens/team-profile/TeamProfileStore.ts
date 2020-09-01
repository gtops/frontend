import {Store} from "../../components/store";
import {autobind} from "core-decorators";
import {observable} from "mobx";
import {AxiosResponse} from "axios";
import {
    IGetEventParticipantsResponse, IGetEventResponse, IGetTeamCoachesResponse, IGetTeamInfoResponse,
    IGetTeamsResponse
} from "../../services/transport/responses";
import {ITableData} from "../../components/table";
import {EFormTypes} from "../../EFormTypes";
import {EEventStatus} from "../event-profile/EEventStatus";
import {IUser} from "../../components/user-form/IUserFormProps";
import {getDateString} from "../../services/utils";

@autobind
export class TeamProfileStore extends Store {
    @observable teamId = -1;
    @observable coaches: ITableData[] = [];
    @observable participants: ITableData[] = [];
    @observable isVisible = false;
    @observable canEditEvent = false;
    @observable formType = EFormTypes.TEAM_USER;
    @observable name = "";
    @observable newName = "";
    @observable isChangingName = false;
    @observable status = EEventStatus.COMPLETED;
    @observable isConfirmPopupVisible = false;
    @observable isEditForm = false;
    @observable popupText = "";
    @observable submitHandler: (id: number) => void = () => void 0;
    @observable selectedId = -1;
    @observable data?: IUser;
    @observable eventId = -1;
    @observable orgId = -1;

    onSuccessChangeName(response: AxiosResponse): void {
        console.log("[EventProfileStore.onSuccessChangeName]: ", response);
        this.isChangingName = false;
    }

    onSuccess(response: AxiosResponse<IGetTeamCoachesResponse[]>) {
        console.log("[TeamProfileStore.onSuccess]: ", response);
        this.coaches = response.data.map(item => {
            return {
                isVisible: true,
                data: item
            }
        })
    }

    onSuccessGetInfo(response: AxiosResponse<IGetTeamInfoResponse>) {
        console.log("[TeamProfileStore.onSuccessGetInfo]: ", response);
        this.name = response.data.name;
        this.eventId = response.data.eventId;
        this.orgId = response.data.organizationId;
        this.newName = this.name;
    }

    onSuccessGetEventInfo(response: AxiosResponse<IGetEventResponse>) {
        console.log("[TeamProfileStore.onSuccessGetEventInfo]: ", response);
        this.status = response.data.status;
    }

    onSuccessGetUserTeams(response: AxiosResponse<IGetTeamsResponse[]>) {
        console.log("[TeamProfileStore.onSuccessGetUserTeams]: ", response);
        response.data.forEach(value => {
            if (this.teamId == value.id) {
                this.canEditEvent = true;
            }
        })
    }

    canEdit(): boolean {
        return this.canEditEvent && this.status === EEventStatus.PREPARATION
    }

    onSuccessAccept(response: AxiosResponse): void {
        console.log("[TeamProfileStore.onSuccessAccept]: ", response);
    }

    onSuccessDelete(response: AxiosResponse): void {
        console.log("[TeamProfileStore.onSuccessDelete]: ", response);
    }

    onSuccessGetParticipants(response: AxiosResponse<IGetEventParticipantsResponse[]>) {
        console.log("[TeamProfileStore.onSuccessGetParticipants]: ", response);
        this.participants = response.data.map(item => {
            return {
                isVisible: true,
                data: {
                    ...item,
                    status: item.isConfirmed ? "подтвержден" : "не подтвержден",
                    dateOfBirth: getDateString(item.dateOfBirth)
        },
            }
        })
    }

    getWrapperTitle(): string {
        if (this.isEditForm) {
            return "Редактировать пользователя"
        }

        if (this.formType == EFormTypes.COACH) {
            return "Добавить тренера"
        } else if (this.formType == EFormTypes.TEAM_USER) {
            return "Добавить участника";
        }

        return "";
    }

    getSuccessMessage(): string {
        if (this.isEditForm) {
            return "Данные успешно изменены"
        }

        if (this.formType == EFormTypes.COACH) {
            return "Тренер успешно добавлен"
        } else if (this.formType == EFormTypes.TEAM_USER) {
            return "Участник успешно добавлен";
        }

        return "";
    }

}