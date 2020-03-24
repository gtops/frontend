import {observable} from "mobx";
import {autobind} from "core-decorators";
import {AxiosResponse} from "axios";
import {ERoles, UserStore} from "../../components/user-store";
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
        UserStore.getInstance().refreshToken = response.data.refreshToken;
        UserStore.getInstance().organizationId = response.data.organizationId || -1;
        switch (response.data.role) {
            case "Локальный администратор": localStorage.setItem("role", ERoles.LOCAL_ADMIN); break;
            case "Глобальный администратор": localStorage.setItem("role", ERoles.ADMIN); break;
            default: break;
        }
        window.location.replace("/profile");
    }
}