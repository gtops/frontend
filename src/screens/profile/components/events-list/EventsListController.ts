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
        this.store.transport
            .getOrgEventsList(UserStore.getInstance().organizationId)
            .then(this.store.onSuccess)
            .catch(this.store.onError)
    }
}