import {Store} from "../../../../components/store";
import {autobind} from "core-decorators";
import {AxiosResponse} from "axios";
import {IGetOrgEventsListResponse} from "../../../../services/transport/responses";
import {observable} from "mobx";
import {ITableData} from "../../../../components/table";

@autobind
export class EventsListStore extends Store {
    @observable eventsList: ITableData[] = [];

    onSuccess(response: AxiosResponse<IGetOrgEventsListResponse[]>): void {
        console.log(response);
        this.eventsList = response.data.map(item => {
            return (
                {
                    isVisible: true,
                    data: {eventName: item.name, eventStartDate: item.startDate, desc: item.description}
                }
            )
        });
    }
}