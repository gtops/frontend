import {EventParticipantsStore} from "./EventParticipantsStore";
import {autobind} from "core-decorators";
import {IEventParticipantsProps} from "./IEventParticipantsProps";
import * as React from "react";
import {EPath} from "../../../../EPath";

@autobind
export class EventParticipantsController {
    private readonly store: EventParticipantsStore;

    constructor(store: EventParticipantsStore) {
        this.store = store;
    }

    onComponentWillMount(props: IEventParticipantsProps): void {
        this.store.eventId = props.eventId;
        this.store.canEditEvent = props.canEditEvent;
        this.store.hasOrgRights = props.hasOrgRights;
    }

    onComponentDidMount(): void {
        this.getParticipants();
    }

    showUserForm(): void {
        this.store.isVisible = true;
    }

    onDelete(): void {
        this.deleteParticipant(this.store.selectedId);
        this.store.closePopup();
    }

    onSuccessAddUser(): void {
        this.getParticipants();
        this.store.isVisible = false;
    }

    getParticipants(): void {
        this.store.transport
            .getEventParticipants(this.store.eventId)
            .then(this.store.onSuccessGetEventParticipants)
            .catch(this.store.onError)
    }

    closeWrapper(): void {
        this.store.isVisible = false;
    }

    onChangeSearch(event: React.ChangeEvent<HTMLInputElement>): void {
        if (isNaN(+event.target.value)) {
            return
        }
        this.store.searchValue = event.target.value;
    }

    onSubmitSearchForm(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        window.location.replace(
            EPath.USER_RESULT.replace(":eventId", this.store.eventId.toString())
                .replace(":userId", this.store.searchValue)
        )
    }

    acceptParticipant(participantId: number): void {
        this.store.transport
            .applyUserEventRequest(participantId)
            .then(this.store.onSuccessAccept)
            .then(this.getParticipants)
            .catch(this.store.onErrorImpl);
    }

    deleteParticipant(participantId: number): void {
        this.store.transport
            .removeParticipant(participantId)
            .then(this.store.onSuccessDelete)
            .then(this.getParticipants)
            .catch(this.store.onErrorImpl);
    }
}