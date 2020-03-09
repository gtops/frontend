import {CommonProfileStore} from "../common-profile/CommonProfileStore";
import {observable} from "mobx";
import {IGetOrgsListResponse, IGetRolesResponse} from "../../../../services/transport/responses";
import {AxiosResponse} from "axios";
import {IRole} from "../../../../components/user-store";
import {autobind} from "core-decorators";
import {ITableColumn, ITableData} from "../../../../components/table";
import {IAddOrgParams, IEditOrgParams} from "../../../../services/transport/params";
import * as React from "react";

let EMPTY_FORM_VALUES: IAddOrgParams = {
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

@autobind
export class AdminProfileStore extends CommonProfileStore {
    @observable roles: IRole[] = [];
    @observable selectedOrgId = -1;
    @observable cell?: (data: object) => React.ReactNode;
    @observable email = "";
    @observable isSuccessPopupVisible = false;
    @observable orgColumns: ITableColumn[] = [];
    @observable orgData: ITableData[] = [];
    @observable orgsList: IGetOrgsListResponse[] = [];

    @observable eventColumns: ITableColumn[] = [
        {accessor: "eventName", title: "Название", className: "name"},
        {accessor: "eventDate", title: "Дата"},
        {accessor: "eventСount", title: "Количество участников"},
    ];
    @observable eventData: ITableData[] = [
        {isVisible: true, data: {eventName: "ГТО", eventDate: new Date().toDateString(), eventCount: "20"}},

    ];

    @observable addFormValues: IAddOrgParams = EMPTY_FORM_VALUES;

    @observable editFormValues: IAddOrgParams = EMPTY_FORM_VALUES;

    onSuccessGetRoles(response: AxiosResponse<IGetRolesResponse>): void {
        console.log("[ProfileStore.onSuccessGetRoles]:", response);
        this.roles = response.data.roles;
    }

    onSuccessGetOrgsList(response: AxiosResponse<IGetOrgsListResponse[]>): void {
        console.log("[ProfileStore.onSuccessGetOrgsList]:", response);
        this.orgsList = response.data;
        this.orgData = response.data.map(item => {
            return {
                isVisible: true,
                data: {orgName: item.name, orgAddress: item.address, orgId: item.id}
            }
        });
    }

    onSuccessInvite(response: AxiosResponse): void {
        console.log("[ProfileStore.onSuccessInvite]:", response);
    }

    onSuccessEdit(response: AxiosResponse): void {
        console.log("[ProfileStore.onSuccessEdit]:", response);
        this.isSuccessPopupVisible = true;
    }
}