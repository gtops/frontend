import {AllEventsStore} from "./AllEventsStore";
import {autobind} from "core-decorators";
import {isUndefined} from "lodash";
import {UserStore} from "../../components/user-store";

@autobind
export class AllEventsController {
    private readonly store: AllEventsStore;

    constructor(store: AllEventsStore) {
        this.store = store;
    }

    onComponentDidMount(): void {
        if (UserStore.getInstance().isLogin()) {
            this.getUserEvents();
        }

        this.store.transport
            .getOrgsList()
            .then(this.store.onSuccessGetOrgsList)
            .catch(this.store.onError)
    }

    getUserEvents(): void {
        this.store.transport
            .getUserEvents()
            .then(this.store.onSuccessGetUserEvents)
            .catch(this.store.onError)
    }

    sendRequest(id: number) {
        this.store.transport
            .userEventRequest(id)
            .then(this.store.onSuccessSendRequest)
            .catch(this.store.onError)
    }

    handleClose(): void {
        this.store.popupText = "";
    }

    onItemClick(id: number) {
        let isEmptyData = isUndefined(this.store.events.get(id));

        this.store.orgsList = this.store.orgsList.map(item => {
            if (item.data.id !== id) return item;
            return {
                isVisible: !item.isVisible,
                data: item.data
            }
        });

        if (!isEmptyData) return;
        this.getList(id);
    }

    getList(id: number): void {
        this.store.transport
            .getOrgEventsList(id)
            .then((response) => this.store.onSuccessGetEvents(response, id))
            .catch(this.store.onError)
    }
}