import {GetIdFromPathname} from "../../services/utils"
import {autobind} from "core-decorators";
import {EventProfileStore} from "./EventProfileStore";
import {ReactNode} from "react";
import {IEventProfileProps} from "./IEventProfileProps";
import {isUndefined} from "lodash";
import {AxiosError, AxiosResponse} from "axios";
import * as React from "react";

@autobind
export class EventProfileController {
    private readonly store: EventProfileStore;

    constructor(store: EventProfileStore) {
        this.store = store;
    }

    onComponentWillMount(props: IEventProfileProps): void {
        if (isUndefined(props.match)) return;

        this.store.orgId = props.match.params.orgId || -1;
        this.store.eventId = props.match.params.eventId || -1;
    }

    onComponentDidMount(): void {
        this.getSecretaries();
        this.getTeams();
        this.getParticipants();
        this.store.transport
            .getEvent(this.store.orgId, this.store.eventId)
            .then(this.store.onSuccessGetEvent)
            .catch(this.store.onError)
    }

    private getParticipants(): void {
        this.store.transport
            .getEventParticipants(this.store.eventId)
            .then(this.store.onSuccessGetEventParticipants)
            .catch(this.store.onError)
    }

    private getTeams(): void {
        this.store.transport
            .getTeams(this.store.orgId, this.store.eventId)
            .then(this.store.onSuccessGetTeams)
            .catch(this.store.onError)
    }

    private getSecretaries(): void {
        this.store.transport
            .getSecretaries(this.store.orgId, this.store.eventId)
            .then(this.store.onSuccessGetSecretaries)
            .catch(this.store.onError);
    }

    onSuccessAddSecretary(): void {
        this.getSecretaries();
        this.store.isError = false;
        this.store.isVisible = false;
        this.store.popupText = "Секретарь успешно добавлен";
        this.store.isPopupVisible = true;
    }

    onErrorAddSecretary(error: string): void {
        this.store.onErrorImpl(error)
    }

    handleCloseClick(): void {
        this.store.isPopupVisible = false;
        this.store.popupText = "";
        this.store.isError = false;
    }

    handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.store.teamName = event.target.value;
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        if (this.store.teamName == "") {
            this.store.isError = true;
            this.store.popupText = "Введите название команды";
            this.store.isPopupVisible = true;
            return;
        }
        this.store.transport
            .addTeam(this.store.teamName, this.store.orgId, this.store.eventId)
            .then(this.store.onSuccessAddTeam)
            .then(this.getTeams)
            .catch(this.store.onErrorImpl)
    }

    deleteSecretary(secretaryId: number): void {
        this.store.transport
            .removeSecretary(this.store.orgId, this.store.eventId, secretaryId)
            .then(this.store.onSuccessDeleteSecretary)
            .then(this.getSecretaries)
            .catch(this.store.onError);
    }

    deleteParticipant(participantId: number): void {
        this.store.transport
            .removeParticipant(this.store.eventId, participantId)
            .then(this.store.onSuccessDeleteSecretary)
            .then(this.getParticipants)
            .catch(this.store.onErrorImpl);
    }

    acceptParticipant(participantId: number): void {
        this.store.transport
            .applyUserEventRequest(this.store.eventId, participantId)
            .then(this.store.onSuccessAccept)
            .then(this.getParticipants)
            .catch(this.store.onErrorImpl);
    }

    sendEventRequest(): void {
        this.store.transport
            .userEventRequest(this.store.eventId)
            .then(this.store.onSuccessSendEventRequest)
            .catch(this.store.onErrorImpl)
    }

    showForm(): void {
        this.store.isVisible = true;
    }

    closeWrapper(): void {
        this.store.isVisible = false;
    }
}