import {autobind} from "core-decorators";
import {AxiosResponse} from "axios";
import {observable} from "mobx";
import {Store} from "../../../../../../components/store";
import {IGetSportObjectResponse} from "../../../../../../services/transport/responses";
import {ITableData} from "../../../../../../components/table";

@autobind
export class SportObjectCatalogStore extends Store {
    @observable secretaries: ITableData[] = [];
    @observable isFormVisible = false;

    onSuccessGetSportObject(response: AxiosResponse<IGetSportObjectResponse[]>): void {
        console.log("[CatalogsStore.onSuccessGetSecretariesCatalog]: ", response);
        this.secretaries = response.data.map(item => {
            return {
                data: item,
                isVisible: true
            }
        })
    }

    onSuccessRemove(response: AxiosResponse): void {
        console.log("[SportObjectCatalogStore.onSuccessRemove]: ", response);
    }
}