import {Store} from "../../components/store";
import {autobind} from "core-decorators";
import {action, observable} from "mobx";
import {AxiosError, AxiosResponse} from "axios";
import {ERoles, UserStore} from "../../components/user-store";
import {IGetUserEventsResponse} from "../../services/transport/responses/IGetUserEventsResponse";
import { Subject } from "rxjs";
import {IGetEventResponse, IGetOrgEventsListResponse} from "../../services/transport/responses";
import {EEventStatus} from "./EEventStatus";


@autobind
export class EventProfileStore extends Store {
    @observable event: IGetEventResponse = {
        id: -1,
        organizationId: -1,
        name: "",
        startDate: "",
        expirationDate: "",
        description: "",
        status: EEventStatus.COMPLETED
    };
    @observable orgId = -1;
    @observable eventId = -1;
    @observable isPopupVisible = false;
    @observable popupText = "";
    @observable canEditEvent = false;
    readonly _update$ = new Subject<void>();

    onSuccessGetUserEvents(response: AxiosResponse<IGetUserEventsResponse[]> | AxiosResponse<IGetOrgEventsListResponse[]>): void {
        response.data.forEach((value: IGetUserEventsResponse | IGetOrgEventsListResponse) => {
            if (value.id == this.eventId) {
                this.canEditEvent = true;
            }
        })
    }

    onSuccessGetEvent(response: AxiosResponse<IGetEventResponse>): void {
        this.event = response.data;
    }

    canEdit(): boolean {
         return this.hasOrgRights() && this.event.status === EEventStatus.PREPARATION;
    }

    hasOrgRights(): boolean {
        return (UserStore.getInstance().role == ERoles.LOCAL_ADMIN || UserStore.getInstance().role == ERoles.SECRETARY)
            && this.canEditEvent
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
        this.popupText = errText;
        this.isPopupVisible = true;
    }
}