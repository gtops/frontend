import {EventsListStore} from "./EventsListStore";
import {autobind} from "core-decorators";
import {UserStore} from "../../../../components/user-store";

@autobind
export class EventsListController {
    private readonly store: EventsListStore;

    constructor(store: EventsListStore) {
        this.store = store;
    }

    onComponentDidMount(): void {
        this.getEventsList();
    }

    onDelete(): void {
        this.deleteEvent(UserStore.getInstance().organizationId, this.store.selectedId);
        this.store.closePopup();
    }

    closePopup(): void {
        this.store.isConfirmPopupVisible = false
    }

    showPopup(): void {
        this.store.isConfirmPopupVisible = true
    }

    private getEventsList(): void {
        this.store.transport
            .getOrgEventsList(UserStore.getInstance().organizationId)
            .then(this.store.onSuccess)
            .catch(this.store.onError)
    }

    deleteEvent(orgId: number, eventId: number): void {
        this.store.transport
            .removeEvent(orgId, eventId)
            .then(this.store.onSuccessDelete)
            .then(this.getEventsList)
            .catch(this.store.onError)
    }
}