import {IRole} from "../../components/user-store";
import {observable} from "mobx";
import {AxiosResponse} from "axios";
import {autobind} from "core-decorators";
import {Store} from "../../components/store";
import {IGetRolesResponse} from "../../services/transport/responses";

@autobind
export class ProfileStore extends Store {
    @observable roles: IRole[] = [];
    @observable selectedRoleId = "";
    @observable email = "";
    @observable isSuccessPopupVisible = false;

    onSuccessGetRoles(response: AxiosResponse<IGetRolesResponse>): void {
        console.log("[ProfileStore.onSuccessGetRoles]:", response);
        this.roles = response.data.roles;
    }

    onSuccessInvite(response: AxiosResponse): void {
        console.log("[ProfileStore.onSuccessInvite]:", response);
        this.isSuccessPopupVisible = true;
    }
}