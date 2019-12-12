import {isEmpty} from "lodash";
import {autobind} from "core-decorators";
import {IRole} from "./IRole";
import {Transport} from "../../services/transport";
import {ERoles} from "./ERoles";

@autobind
export class UserStore {
    private static _instance: UserStore;
    private readonly transport = new Transport();
    private roles: IRole[] = [];
    private _role: ERoles = ERoles.ADMIN;

    constructor() {
        if (UserStore._instance){
            throw new Error("Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.");
        }
    }

    public static getInstance(): UserStore {
        UserStore._instance = UserStore._instance || new UserStore();
        return UserStore._instance;
    }

    set token(value: string) {
        localStorage.setItem("AccessToken", value);
    }

    get token() {
        return localStorage.getItem("AccessToken") || "";
    }

    isLogin(): boolean {
        return !isEmpty(localStorage.getItem("AccessToken"));
    }

    get role(): ERoles {
        return this._role;
    }
}

export { IRole } from "./IRole";
export { ERoles } from "./ERoles";