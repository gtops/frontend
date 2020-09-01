import {getFormattedDate, GetIdFromPathname} from "../../services/utils"
import {autobind} from "core-decorators";
import {EventProfileStore} from "./EventProfileStore";
import {ReactNode} from "react";
import {IEventProfileProps} from "./IEventProfileProps";
import {isUndefined} from "lodash";
import {AxiosError, AxiosResponse} from "axios";
import * as React from "react";
import {ERoles, UserStore} from "../../components/user-store";
import {EFormTypes} from "../../EFormTypes";
import {OptionValue} from "react-selectize";

@autobind
export class EventProfileController {
    private readonly store: EventProfileStore;

    constructor(store: EventProfileStore) {
        this.store = store;
    }

    onComponentWillMount(props: IEventProfileProps): void {
        if (isUndefined(props.match)) return;

        if (isUndefined(props.match.params.orgId) || isUndefined(props.match.params.eventId)) return;
        this.store.orgId = isNaN(+props.match.params.orgId) ? -1 : props.match.params.orgId;
        this.store.eventId = isNaN(+props.match.params.eventId) ? -1 : props.match.params.eventId;
        this.store._update$.subscribe(this.onComponentDidMount)
    }

    onComponentDidMount(): void {
        this.getUserEvents();
        this.getEventInfo();
    }

    getEventInfo(): void {
        this.store.transport
            .getEvent(this.store.orgId, this.store.eventId)
            .then(this.store.onSuccessGetEvent)
            .catch(this.store.onError)
    }

    private getUserEvents(): void {
        if (UserStore.getInstance().role == ERoles.SECRETARY) {
            this.store.transport.getSecretaryEvents().then(this.store.onSuccessGetUserEvents)
        }
        if (UserStore.getInstance().role == ERoles.LOCAL_ADMIN) {
            this.store.transport
                .getOrgEventsList(UserStore.getInstance().organizationId)
                .then(this.store.onSuccessGetUserEvents)
        }
    }

    handleCloseClick(): void {
        this.store.isPopupVisible = false;
        this.store.popupText = "";
        this.store.isError = false;
    }
}