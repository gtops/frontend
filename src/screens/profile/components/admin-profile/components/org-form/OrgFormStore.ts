import {observable} from "mobx";
import {AxiosError, AxiosResponse} from "axios";
import {autobind} from "core-decorators";
import * as React from "react";
import {IAddOrgParams} from "../../../../../../services/transport/params";
import {IGetOrgsListResponse} from "../../../../../../services/transport/responses";
import {CommonProfileStore} from "../../../common-profile/CommonProfileStore";


@autobind
export class OrgFormStore extends CommonProfileStore {
    EMPTY_FORM_VALUES: IAddOrgParams = {
        name: "",
        address: "",
        leader: "",
        phoneNumber: "",
        oqrn: "",
        paymentAccount: "",
        branch: "",
        bik: "",
        correspondentAccount: "",
    };
    @observable selectedOrgId = -1;
    @observable isPopupVisible = false;
    @observable formValues: IAddOrgParams = this.EMPTY_FORM_VALUES;
    @observable orgsList: IGetOrgsListResponse[] = [];
    @observable isEditForm? = false;
    @observable popupText = "";

    onSuccessGetOrgsList(response: AxiosResponse<IGetOrgsListResponse[]>): void {
        console.log("[OrgFormStore.onSuccessGetOrgsList]:", response);
        this.orgsList = response.data;
    }

    onSuccess(response: AxiosResponse): void {
        console.log("[OrgFormStore.onSuccess]:", response);
        this.popupText = this.isEditForm ? "Данные успешно изменены." : "Организауия успешно добавлена.";
        this.isPopupVisible = true;
    }

    onError(error: AxiosError): void {
        this.isError = true;
        let res = error.response ? error.response.statusText : "";
        this.popupText = "Произошла ошибка. Статус: " + res;
        this.isPopupVisible = true;
    }
}