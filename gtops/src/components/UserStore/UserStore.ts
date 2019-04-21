import {isEmpty} from "lodash";
import {autobind} from "core-decorators";

@autobind
export class UserStore {
    private static _instance: UserStore;

    constructor() {
        if (UserStore._instance){
            console.log("g5rg4revgree");
            throw new Error("Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.");
        }
    }

    public static getInstance(): UserStore {
        console.log(UserStore._instance);
        UserStore._instance = UserStore._instance || new UserStore();
        return UserStore._instance;
    }

    private _token: string = "";

    get token(): string {
        return this._token;
    }

    set token(value: string) {
        console.log(value)
        this._token = value;
    }

    isLogin(): boolean {
        // console.log(this._token)
        return !isEmpty(this._token);
    }
}