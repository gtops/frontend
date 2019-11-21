import {observable} from "mobx";
import {autobind} from "core-decorators";
import {AxiosResponse} from "axios";
import {UserStore} from "../../components/user-store";
import {Store} from "../../components/store";
import {ILoginResponse} from "../../services/transport/responses";

@autobind
export class LoginStore extends Store {
    @observable email = "";
    @observable password = "";

    setEmail(value: string) {
        this.email = value;
    }

    setPassword(value: string) {
        this.password = value;
    }

    onSuccess(response: AxiosResponse<ILoginResponse>): void {
        console.log("Login.onSuccess", response);
        UserStore.getInstance().token = response.data.accessToken;
        window.location.replace("/profile");
    }
}