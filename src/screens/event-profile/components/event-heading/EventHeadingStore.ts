import {Store} from "../../../../components/store";
import {autobind} from "core-decorators";
import {observable} from "mobx";
import {IGetEventResponse} from "../../../../services/transport/responses";
import {getFormattedDate} from "../../../../services/utils";
import {AxiosResponse} from "axios";
import {IGetUserEventsResponse} from "../../../../services/transport/responses/IGetUserEventsResponse";
import {Subject} from "rxjs";
import {isUndefined} from "lodash";
import {EEventStatus} from "../../EEventStatus";

@autobind
export class EventHeadingStore extends Store {
    @observable orgId = -1;
    @observable eventId = -1;
    @observable event: IGetEventResponse = {
        id: -1,
        organizationId: -1,
        name: "",
        startDate: "",
        expirationDate: "",
        description: "",
        status: EEventStatus.COMPLETED
    };
    @observable startDate = this.event.startDate;
    @observable expirationDate = this.event.expirationDate;
    @observable isChangingName = false;
    @observable newName = "";
    @observable canEditEvent = false;
    @observable showChangeStartDate = false;
    @observable showChangeExpirationDate = false;
    @observable isParticipant = false;
    @observable isConfirmed = false;
    @observable isLoading = false;
    @observable csvLink = "";
    statuses = [EEventStatus.PREPARATION, EEventStatus.READINESS, EEventStatus.ACTIVITIES, EEventStatus.COMPLETED];
    _update$?: Subject<void>;

    getNextStatus(): string {
        switch (this.event.status) {
            case EEventStatus.PREPARATION: return EEventStatus.READINESS;
            case EEventStatus.READINESS: return EEventStatus.ACTIVITIES;
            case EEventStatus.ACTIVITIES: return EEventStatus.COMPLETED;
            default: return ""
        }
    }

    onSuccessChangeStatus(response: AxiosResponse): void {
        if (isUndefined(this._update$)) return;
        this._update$.next();
    }

    onSuccessGetEvent(response: AxiosResponse<IGetEventResponse>): void {
        console.log("[EventProfileStore.onSuccessGetEvent]: ", response);
        this.event = response.data;
        this.startDate = getFormattedDate(new Date(response.data.startDate));
        this.expirationDate = getFormattedDate(new Date(response.data.expirationDate));
        this.newName = response.data.name;
    }

    onSuccessGetCSV(response: AxiosResponse<string>): void {
        this.isLoading = false;
        this.csvLink = response.data;
    }

    onSuccessGetEvents(response: AxiosResponse<IGetUserEventsResponse[]>) {
        console.log("[UserProfileStore.onSuccessGetEvents]: ", response);
        this.isParticipant = false;
        response.data.forEach(item => {
            if (item.id == this.eventId) {
                this.isParticipant = true;
                this.isConfirmed = item.userConfirmed;
            }
        })
    }

    onSuccessCancel(response: AxiosResponse): void {
        console.log("[EventProfileStore.onSuccessCancel]: ", response);
        this.isParticipant = false;
        if (isUndefined(this._update$)) return;
        this._update$.next();
    }

    onSuccessChangeName(response: AxiosResponse): void {
        console.log("[EventProfileStore.onSuccessChangeName]: ", response);
        this.isChangingName = false;
    }

    onSuccessChangeExpirationDate(response: AxiosResponse): void {
        console.log("[EventProfileStore.onSuccessChangeExpirationDate]: ", response);
        this.showChangeExpirationDate = false;
    }

    onSuccessChangeStartDate(response: AxiosResponse): void {
        console.log("[EventProfileStore.onSuccessChangeExpirationDate]: ", response);
        this.showChangeStartDate = false;
    }

    onSuccessSendEventRequest(response: AxiosResponse): void {
        console.log("[EventProfileStore.onSuccessSendEventRequest]: ", response);
        this.isError = false;
        if (isUndefined(this._update$)) return;
        this._update$.next();
    }
}