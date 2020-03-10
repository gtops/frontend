import {Store} from "../../../../../../components/store";
import {observable} from "mobx";
import {IGetOrgsListResponse} from "../../../../../../services/transport/responses";
import {IAddAdminParams} from "../../../../../../services/transport/params";
import {AxiosError, AxiosResponse} from "axios";
import {autobind} from "core-decorators";

@autobind
export class AddAdminFormStore extends Store {
    EMPTY_ADMIN_VALUES: IAddAdminParams = {
        name: "",
        email: "",
        password: ""
    };
    @observable orgsList: IGetOrgsListResponse[] = [];
    @observable adminValues: IAddAdminParams = this.EMPTY_ADMIN_VALUES;
    @observable email = "";
    @observable selectedOrgId = -1;
    @observable selectedAdminId = -1;
    @observable popupText = "";
    @observable isPopupVisible = false;
    @observable isAddChecked = true;

    onSuccess(response: AxiosResponse): void {
        console.log("[AddAdminFormStore.onSuccess]:", response);
        this.popupText = "Администратор добавлен";
        this.isPopupVisible = true;
    }

    onSuccessGetOrgsList(response: AxiosResponse<IGetOrgsListResponse[]>): void {
        console.log("[AddAdminFormStore.onSuccessGetOrgsList]:", response);
        this.orgsList = response.data;
    }

    onError(error: AxiosError): void {
        this.isError = true;
        let errors = error.response ? error.response.data.errors : [];
        let message = errors.length > 0 ? errors[0].description : "";
        this.popupText = `Произошла ошибка. Статус: ${message}`;
        this.isPopupVisible = true;
    }
}