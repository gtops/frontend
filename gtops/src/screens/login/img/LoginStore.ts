import {observable} from "mobx";
import {autobind} from "core-decorators";

@autobind
export class LoginStore {
    @observable email = "";
    @observable password = "";

    setEmail(value: string) {
        this.email = value;
    }

    setPassword(value: string) {
        this.password = value;
    }
}