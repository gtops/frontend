export class UserStore {
    private static _instance: UserStore;

    public static get Instance()
    {
        return this._instance || (this._instance = new this());
    }

    private _token: string = "";

    get token(): string {
        return this._token;
    }
    set token(value: string) {
        this._token = value;
    }

}