import {isEmpty} from "lodash";
import {autobind} from "core-decorators";
import {IRole} from "./IRole";
import {Transport} from "../../services/Transport";
import {AxiosResponse} from "axios";

@autobind
export class UserStore {
    private static _instance: UserStore;
    private readonly transport = new Transport();
    private roles: IRole[] = [];

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
        localStorage.setItem("token", value);
    }

    isLogin(): boolean {
        return !isEmpty(localStorage.getItem("token"));
    }
}

export { IRole } from "./IRole";