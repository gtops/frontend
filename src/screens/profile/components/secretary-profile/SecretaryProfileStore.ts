import {Store} from "../../../../components/store";
import {autobind} from "core-decorators";
import {IGetUserEventsResponse} from "../../../../services/transport/responses/IGetUserEventsResponse";
import {AxiosResponse} from "axios";
import {observable} from "mobx";
import {ITableData} from "../../../../components/table";
import {getDateString} from "../../../../services/utils";

@autobind
export class SecretaryProfileStore extends Store {
    @observable data: ITableData[] = [];

    onSuccessGetEvents(response: AxiosResponse<IGetUserEventsResponse[]>) {
        console.log("[UserProfileStore.onSuccessGetEvents]: ", response);
        this.data = response.data.map(item => {
            return(
                {
                    isVisible: true,
                    data: {
                        ...item,
                        startDate: getDateString(item.startDate),
                    }
                }
            )
        })
    }
}