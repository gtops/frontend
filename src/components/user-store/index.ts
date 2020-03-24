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
    private _role: ERoles = ERoles.USER;

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

    set refreshToken(value: string) {
        localStorage.setItem("RefreshToken", value);
    }

    get refreshToken() {
        return localStorage.getItem("RefreshToken") || "";
    }

    isLogin(): boolean {
        return !isEmpty(localStorage.getItem("AccessToken"));
    }

    set role(value: ERoles) {
        localStorage.setItem("role", value);
    }

    get role(): ERoles {
        return localStorage.getItem("role") as ERoles;
    }

    set organizationId(value: number) {
        localStorage.setItem("organizationId", value.toString());
    }

    get organizationId(): number {
        console.log(localStorage.getItem("organizationId"));
        console.log(isEmpty(localStorage.getItem("organizationId")));
        return isEmpty(localStorage.getItem("organizationId")) ? -1 : +localStorage.getItem("organizationId")!;
    }
}

export { IRole } from "./IRole";
export { ERoles } from "./ERoles";