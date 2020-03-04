import {CommonProfileStore} from "../common-profile/CommonProfileStore";
import {observable} from "mobx";
import {IGetOrgsListResponse, IGetRolesResponse} from "../../../../services/transport/responses";
import {AxiosResponse} from "axios";
import {IRole} from "../../../../components/user-store";
import {autobind} from "core-decorators";
import {ITableColumn, ITableData} from "../../../../components/table";
import {IAddOrgParams} from "../../../../services/transport/params";
import * as React from "react";

@autobind
export class AdminProfileStore extends CommonProfileStore {
    @observable roles: IRole[] = [];
    @observable selectedRoleId = "";
    @observable cell?: (data: object) => React.ReactNode;
    @observable email = "";
    @observable isSuccessPopupVisible = false;
    @observable orgColumns: ITableColumn[] = [];
    @observable orgData: ITableData[] = [];

    @observable eventColumns: ITableColumn[] = [
        {accessor: "eventName", title: "Название", className: "name"},
        {accessor: "eventDate", title: "Дата"},
        {accessor: "eventСount", title: "Количество участников"},
    ];
    @observable eventData: ITableData[] = [
        {isVisible: true, data: {eventName: "ГТО", eventDate: new Date().toDateString(), eventCount: "20"}},

    ];

    @observable addFormValues: IAddOrgParams = {
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

    onSuccessGetRoles(response: AxiosResponse<IGetRolesResponse>): void {
        console.log("[ProfileStore.onSuccessGetRoles]:", response);
        this.roles = response.data.roles;
    }

    onSuccessGetOrgsList(response: AxiosResponse<IGetOrgsListResponse[]>): void {
        console.log("[ProfileStore.onSuccessGetOrgsList]:", response);
        this.orgData = response.data.map(item => {
            return {
                isVisible: true,
                data: {orgName: item.name, orgAddress: item.address, orgId: item.id}
            }
        });
    }

    onSuccessInvite(response: AxiosResponse): void {
        console.log("[ProfileStore.onSuccessInvite]:", response);
        this.isSuccessPopupVisible = true;
    }
}