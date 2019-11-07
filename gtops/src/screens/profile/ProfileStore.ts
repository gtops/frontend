import {IRole} from "../../components/user-store";
import {observable} from "mobx";
import {AxiosResponse} from "axios";
import {IGetRolesResponse} from "../../services/Transport/responses/IGetRolesResponse";
import {autobind} from "core-decorators";

@autobind
export class ProfileStore {
    @observable roles: IRole[] = [];
    @observable selectedRoleId = "";
    @observable email = "";

    onSuccessGetRoles(response: AxiosResponse<IGetRolesResponse>): void {
        console.log("[ProfileStore.onSuccessGetRoles]:", response);
        this.roles = response.data.roles;
    }
}