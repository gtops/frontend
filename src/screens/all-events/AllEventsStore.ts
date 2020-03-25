import {Store} from "../../components/store";
import {autobind} from "core-decorators";
import {IGetOrgEventsListResponse, IGetOrgsListResponse} from "../../services/transport/responses";
import {observable} from "mobx";
import {AxiosError, AxiosResponse} from "axios";
import {ITableData} from "../../components/table";

interface IOrgsList {
    isVisible: boolean;
    data: IGetOrgsListResponse
}
@autobind
export class AllEventsStore extends Store {
    @observable orgsList: IOrgsList[] = [];
    @observable events: Map<number, ITableData[]> = new Map<number, ITableData[]>();
    @observable popupText = "";

    onSuccessGetOrgsList(response: AxiosResponse<IGetOrgsListResponse[]>): void {
        console.log("[AllEventsStore.onSuccessGetOrgsList]: ", response);
        this.orgsList = response.data.map(item => {
            return {
                isVisible: false,
                data: item,
            }
        });
    }

    onSuccessGetEvents(response: AxiosResponse<IGetOrgEventsListResponse[]>, id: number): void {
        console.log("[AllEventsStore.onSuccessGetEvents]: ", response);
        this.events.set(id, response.data.map(item => {
            return {
                isVisible: true,
                data: item,
            }
        }));
    }

    onSuccessSendRequest(response: AxiosResponse) {
        console.log("[AllEventsStore.onSuccessSendRequest]: ", response);
        this.isError = false;
        this.popupText = "Заявка отправлена и будет рассмотрена"
    }

    onErrorImpl(error: AxiosError) {
        let errors = error.response ? error.response.data.errors : [];
        let message = errors && errors.length > 0 ? errors[0].description : "";
        this.isError = true;
        this.popupText = `Произошла ошибка. ${message}`
    }
}