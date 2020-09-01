import {autobind} from "core-decorators";
import {AxiosResponse} from "axios";
import {observable} from "mobx";
import {Store} from "../../../../../../components/store";
import {IGetJudgesResponse} from "../../../../../../services/transport/responses";
import {ITableData} from "../../../../../../components/table";
import {getDateString} from "../../../../../../services/utils";

@autobind
export class JudgeCatalogStore extends Store {
    @observable data: ITableData[] = [];
    @observable isFormVisible = false;

    onSuccessGetJudges(response: AxiosResponse<IGetJudgesResponse[]>): void {
        console.log("[JudgeCatalogStore.onSuccessGetJudges]: ", response);
        this.data = response.data.map(item => {
            return {
                data: {
                    ...item,
                    dateOfBirth: getDateString(item.dateOfBirth),
                },
                isVisible: true
            }
        })
    }

    onSuccessRemove(response: AxiosResponse): void {
        console.log("[JudgeCatalogStore.onSuccessRemove]: ", response);
    }
}