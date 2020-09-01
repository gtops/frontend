import {autobind} from "core-decorators";
import {EventHeadingStore} from "./EventHeadingStore";
import {IEventHeadingProps} from "./IEventHeadingProps";
import * as React from "react";
import {getFormattedDate} from "../../../../services/utils";
import {UserStore} from "../../../../components/user-store";

@autobind
export class EventHeadingController {
    private readonly store: EventHeadingStore;

    constructor(store: EventHeadingStore) {
        this.store = store;
    }

    onComponentWillMount(props: IEventHeadingProps): void {
        this.store.orgId = props.orgId;
        this.store.eventId = props.eventId;
        this.store.canEditEvent = props.canEditEvent;
        this.store._update$ = props.update;
    }

    onComponentDidMount(): void {
        this.getEventInfo();
        this.getUserEvents();
    }

    generateCSV(): void {
        this.store.isLoading = true;

        this.store.transport
            .getCSV(this.store.eventId)
            .then(this.store.onSuccessGetCSV)
            .catch(this.store.onError)
    }

    getEventInfo(): void {
        this.store.transport
            .getEvent(this.store.orgId, this.store.eventId)
            .then(this.store.onSuccessGetEvent)
            .catch(this.store.onError)
    }

    changeStatus(): void {
        this.store.transport
            .changeEventStatus(this.store.eventId)
            .then(this.store.onSuccessChangeStatus)
            .then(this.getEventInfo)
            .catch(this.store.onError)
    }

    getUserEvents(): void {
        if (!UserStore.getInstance().isLogin()) return;
        this.store.transport
            .getUserEvents()
            .then(this.store.onSuccessGetEvents)
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
        this.store.newName = this.store.event.name;
    }

    toggleChangeStartDate(): void {
        this.store.showChangeStartDate = !this.store.showChangeStartDate;
    }

    toggleChangeExpirationDate(): void {
        this.store.showChangeExpirationDate = !this.store.showChangeExpirationDate;
    }

    setStartDate(date: Date | null, event: React.SyntheticEvent<any> | undefined): void {
        if (date === null) return;

        this.store.startDate = getFormattedDate(date);
    }

    setExpirationDate(date: Date | null, event: React.SyntheticEvent<any> | undefined): void {
        if (date === null) return;

        this.store.expirationDate = getFormattedDate(date);
    }

    changeExpirationDate(): void {
        this.store.transport
            .editEvent({
                name: this.store.event.name,
                startDate: getFormattedDate(new Date(this.store.event.startDate)),
                expirationDate: this.store.expirationDate,
                description: this.store.event.description
            }, this.store.orgId, this.store.eventId)
            .then(this.store.onSuccessChangeExpirationDate)
            .then(this.getEventInfo)
            .catch(this.store.onError)
    }

    changeStartDate(): void {
        this.store.transport
            .editEvent({
                name: this.store.event.name,
                startDate: this.store.startDate,
                expirationDate: getFormattedDate(new Date(this.store.event.expirationDate)),
                description: this.store.event.description
            }, this.store.orgId, this.store.eventId)
            .then(this.store.onSuccessChangeStartDate)
            .then(this.getEventInfo)
            .catch(this.store.onError)
    }

    changeEventName(): void {
        this.store.transport
            .editEvent({
                name: this.store.newName,
                startDate: getFormattedDate(new Date(this.store.event.startDate)),
                expirationDate: getFormattedDate(new Date(this.store.expirationDate)),
                description: this.store.event.description
            }, this.store.orgId, this.store.eventId)
            .then(this.store.onSuccessChangeName)
            .then(this.getEventInfo)
            .catch(this.store.onError)
    }

    sendEventRequest(): void {
        this.store.transport
            .userEventRequest(this.store.eventId)
            .then(this.store.onSuccessSendEventRequest)
            .then(this.getUserEvents)
            .catch(this.store.onErrorImpl)
    }

    cancelRequest(): void {
        this.store.transport.cancelUserEventRequest(this.store.eventId).then(this.store.onSuccessCancel)
    }

}