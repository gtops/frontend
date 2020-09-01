import {Store} from "../../components/store";
import {autobind} from "core-decorators";
import {IGetOrgEventsListResponse, IGetOrgsListResponse} from "../../services/transport/responses";
import {observable} from "mobx";
import {AxiosError, AxiosResponse} from "axios";
import {ITableData} from "../../components/table";
import {getDateString} from "../../services/utils";
import {IGetUserEventsResponse} from "../../services/transport/responses/IGetUserEventsResponse";

interface IOrgsList {
    isVisible: boolean;
    data: IGetOrgsListResponse
}

interface IUserEvent {
    id: number,
    isConfirmed: boolean
}

@autobind
export class AllEventsStore extends Store {
    @observable orgsList: IOrgsList[] = [];
    @observable events: Map<number, ITableData[]> = new Map<number, ITableData[]>();
    @observable popupText = "";
    @observable userEvents: IUserEvent[] = [];

    onSuccessGetOrgsList(response: AxiosResponse<IGetOrgsListResponse[]>): void {
        console.log("[AllEventsStore.onSuccessGetOrgsList]: ", response);
        this.orgsList = response.data.map(item => {
            return {
                isVisible: false,
                data: item,
            }
        });
    }

    onSuccessGetUserEvents(response: AxiosResponse<IGetUserEventsResponse[]>) {
        console.log("[UserProfileStore.onSuccessGetEvents]: ", response);
        this.userEvents = response.data.map(value => {
            return {
                id: value.id,
                isConfirmed: value.userConfirmed
            }
        });
    }

    onSuccessGetEvents(response: AxiosResponse<IGetOrgEventsListResponse[]>, id: number): void {
        console.log("[AllEventsStore.onSuccessGetEvents]: ", response);
        this.events.set(id, response.data.map(item => {
            return {
                isVisible: true,
                data: {
                    ...item,
                    startDate: getDateString(item.startDate),
                },
            }
        }));
    }

    onSuccessSendRequest(response: AxiosResponse) {
        console.log("[AllEventsStore.onSuccessSendRequest]: ", response);
        this.isError = false;
        this.popupText = "Заявка отправлена."
    }

    onErrorImpl(error: AxiosError) {
        this.popupText = this.message
    }
}