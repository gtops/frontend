import {IRole} from "../../components/user-store";
import {observable} from "mobx";

export class ProfileStore {
    @observable roles: IRole[] = [];
    @observable selectedRoleId = -1;
    @observable email = "";
}