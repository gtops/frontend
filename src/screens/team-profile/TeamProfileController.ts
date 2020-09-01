import {TeamProfileStore} from "./TeamProfileStore";
import {autobind} from "core-decorators";
import {ITeamProfileProps} from "./ITeamProfileProps";
import {isUndefined} from "lodash";
import {UserStore} from "../../components/user-store";
import {EFormTypes} from "../../EFormTypes";
import * as React from "react";
import {getFormattedDate} from "../../services/utils";
import {IAddUserParams} from "../../services/transport/params";
import {IGetEventParticipantsResponse} from "../../services/transport/responses/IGetEventParticipantsResponse";

@autobind
export class TeamProfileController {
    private readonly store: TeamProfileStore;

    constructor(store: TeamProfileStore) {
        this.store = store;
    }

    acceptParticipant(participantId: number): void {
        this.store.transport
            .applyUserEventRequest(participantId)
            .then(this.store.onSuccessAccept)
            .then(this.getTeamParticipants)
            .catch(this.store.onErrorImpl);
    }

    deleteParticipant(participantId: number): void {
        this.store.transport
            .removeParticipant(participantId)
            .then(this.store.onSuccessDelete)
            .then(this.getTeamParticipants)
            .catch(this.store.onError);
    }

    deleteCoach(coachId: number): void {
        this.store.transport
            .removeCoach(coachId)
            .then(this.store.onSuccessDelete)
            .then(this.getCoaches)
            .catch(this.store.onError);
    }

    showPopup(id: number, type: string): void {
        this.store.submitHandler = type === "coach" ? this.deleteCoach : this.deleteParticipant;
        this.store.selectedId = id;
        this.store.isConfirmPopupVisible = true;
        this.store.popupText = "Вы уверены, что хотите удалить ";
        this.store.popupText += type === "coach" ? "тренера?" : "участинка из команды?";
    }

    onDelete(): void {
        this.store.submitHandler(this.store.selectedId);
        this.store.selectedId = -1;
        this.store.isConfirmPopupVisible = false;
    }

    closePopup(): void {
        this.store.isConfirmPopupVisible = false;
    }

    onComponentDidMount(): void {
        this.getTeamInfo();
        this.getCoaches();
        this.getTeamParticipants();
        if (!UserStore.getInstance().isLogin()) {
            return;
        }
        this.store.transport.getUserTeams().then(this.store.onSuccessGetUserTeams)
    }

    showForm(data: IGetEventParticipantsResponse): void {
        this.store.isVisible = true;
        this.store.formType = EFormTypes.USER;
        this.store.isEditForm = true;
        this.store.data = {
            id: data.EventParticipantId,
            name: data.name,
            email: data.email,
            dateOfBirth: data.dateOfBirth,
            gender: data.gender
        };
    }

    getTeamInfo(): void {
        this.store.transport
            .getTeamInfo(this.store.teamId)
            .then(this.store.onSuccessGetInfo)
            .then(this.getEventInfo)
            .catch(this.store.onError)
    }

    getEventInfo(): void {
        this.store.transport
            .getEvent(this.store.orgId, this.store.eventId)
            .then(this.store.onSuccessGetEventInfo)
            .catch(this.store.onError)
    }

    getCoaches(): void {
        this.store.transport.getTeamCoaches(this.store.teamId).then(this.store.onSuccess);
    }

    getTeamParticipants(): void {
        this.store.transport
            .getTeamParticipants(this.store.teamId)
            .then(this.store.onSuccessGetParticipants)
            .catch(this.store.onError)
    }

    onComponentWillMount(props: ITeamProfileProps): void {
        if (isUndefined(props.match)) return;

        this.store.teamId = props.match.params.teamId || -1;
    }

    showUserForm(): void {
        this.store.isVisible = true;
        this.store.formType = EFormTypes.TEAM_USER
    }

    acceptAllTeam(): void {
        this.store.transport
            .acceptAllTeam(this.store.teamId)
            .then(this.store.onSuccessAccept)
            .then(this.getTeamParticipants)
            .catch(this.store.onError)
    }

    setNewName(event: React.ChangeEvent<HTMLInputElement>): void {
        this.store.newName = event.target.value;
    }

    editName(): void {
        if (!this.store.canEditEvent) return;
        this.store.isChangingName = true;
    }

    cancelNameChanging(): void {
        this.store.isChangingName = false;
    }

    changeTeamName(): void {
        this.store.transport
            .editTeamInfo(this.store.teamId, this.store.newName)
            .then(this.store.onSuccessChangeName)
            .then(this.getTeamInfo)
            .catch(this.store.onError)
    }

    showCoachForm(): void {
        this.store.formType = EFormTypes.COACH;
        this.store.isVisible = true;
    }

    closeForm(): void {
        this.store.isVisible = false;
        this.store.data = undefined;
        this.store.isEditForm = false;
    }

    onSuccessAdd(): void {
        if (this.store.formType == EFormTypes.COACH) {
            this.getCoaches();
        } else {
            this.getTeamParticipants();
        }
        this.store.isVisible = false;
    }
}