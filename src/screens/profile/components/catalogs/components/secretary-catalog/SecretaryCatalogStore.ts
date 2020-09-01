import {autobind} from "core-decorators";
import {AxiosResponse} from "axios";
import {observable} from "mobx";
import {Store} from "../../../../../../components/store/index";
import {IGetSecretaries} from "../../../../../../services/transport/responses/index";
import {ITableData} from "../../../../../../components/table/index";
import {getDateString} from "../../../../../../services/utils/index";

@autobind
export class SecretaryCatalogStore extends Store {
    @observable secretaries: ITableData[] = [];
    @observable isFormVisible = false;

    onSuccessGetSecretariesCatalog(response: AxiosResponse<IGetSecretaries[]>): void {
        console.log("[CatalogsStore.onSuccessGetSecretariesCatalog]: ", response);
        this.secretaries = response.data.map(item => {
            return {
                data: {
                    ...item,
                    dateOfBirth: getDateString(item.dateOfBirth)
                },
                isVisible: true
            }
        })
    }

    onSuccessRemove(response: AxiosResponse): void {
        console.log("[SecretaryCatalogStore.onSuccessRemove]: ", response);
    }
}