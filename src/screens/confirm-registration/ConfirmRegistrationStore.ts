import {observable} from "mobx";
import {autobind} from "core-decorators";
import {AxiosResponse} from "axios";
import {UserStore} from "../../components/user-store";
import {EPath} from "../../EPath";
import {IValidateToken} from "../../services/transport/responses";
import {Store} from "../../components/store";

@autobind
export class ConfirmRegistrationStore extends Store {
    @observable email: string = "";
    @observable name: string = "";
    @observable password: string = "";
    @observable repeatPassword: string = "";
    @observable isMessageShown = false;

    setName(value: string): void {
        this.name = value;
    }

    setPassword(value: string): void {
        this.password = value;
    }

    setRepeatPassword(value: string): void {
        this.repeatPassword = value;
    }

    onSuccessRegister(response: AxiosResponse): void {
        console.log("[RegistrationStore.onSuccessRegister]: ", response);
        UserStore.getInstance().token = "";
        this.isMessageShown = true;
        setTimeout(() => window.location.replace(EPath.LOGIN), 5000);
    }
}