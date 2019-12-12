import {CommonProfileStore} from "../common-profile/CommonProfileStore";
import {observable} from "mobx";
import {IGetRolesResponse} from "../../../../services/transport/responses";
import {AxiosResponse} from "axios";
import {IRole} from "../../../../components/user-store";
import {autobind} from "core-decorators";
import {ITableColumn, ITableData} from "../../../../components/table";

@autobind
export class AdminProfileStore extends CommonProfileStore {
    @observable roles: IRole[] = [];
    @observable selectedRoleId = "";
    @observable email = "";
    @observable isSuccessPopupVisible = false;
    @observable orgColumns: ITableColumn[] = [
        {accessor: "orgName", title: "Название", className: "name"},
        {accessor: "orgAddress", title: "Адрес"},
        {accessor: "orgId", title: "ID"},
    ];
    @observable orgData: ITableData[] = [
        {isVisible: true, data: {orgName: "Организация", orgAddress: "г.Йошкар-Ола, Ленинский проспект 12", orgId: "hfd-74-12"}},
        {isVisible: true, data: {orgName: "Организация1", orgAddress: "г.Йошкар-Ола, Машиностроителей 20", orgId: "78-585-55"}},
        {isVisible: true, data: {orgName: "Организация2", orgAddress: "г.Йошкар-Ола, Волкова 56", orgId: "555-pro-123"}},
    ];

    @observable eventColumns: ITableColumn[] = [
        {accessor: "eventName", title: "Название", className: "name"},
        {accessor: "eventDate", title: "Дата"},
        {accessor: "eventСount", title: "Количество участников"},
    ];
    @observable eventData: ITableData[] = [
        {isVisible: true, data: {eventName: "ГТО", eventDate: new Date().toDateString(), eventСount: "20"}},

    ];

    onSuccessGetRoles(response: AxiosResponse<IGetRolesResponse>): void {
        console.log("[ProfileStore.onSuccessGetRoles]:", response);
        this.roles = response.data.roles;
    }

    onSuccessInvite(response: AxiosResponse): void {
        console.log("[ProfileStore.onSuccessInvite]:", response);
        this.isSuccessPopupVisible = true;
    }
}