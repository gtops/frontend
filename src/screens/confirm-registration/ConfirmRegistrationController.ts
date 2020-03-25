import {UserStore} from "../../components/user-store";
import {IRegistrationParams} from "../../services/transport/params";
import {autobind} from "core-decorators";
import {getQueryParams} from "../../services/utils";
import {isUndefined} from "lodash";
import {EPath} from "../../EPath";
import {ConfirmRegistrationStore} from "./ConfirmRegistrationStore";

interface IRegistrationQueryParams {
    email: string,
    token: string
}

@autobind
export class ConfirmRegistrationController {
    private readonly store: ConfirmRegistrationStore;
    constructor(store: ConfirmRegistrationStore) {
        this.store = store;
    }

    onComponentWillMount(): void {
        let params = getQueryParams(window.location.search) as IRegistrationQueryParams;
        if (isUndefined(params.email) || isUndefined(params.token)) {
            return;
        }
        history.replaceState("", "", EPath.CONFIRM_REGISTRATION);
        UserStore.getInstance().token = params.token;
        this.store.email = params.email;
    }

    onSubmit(): void {
        const params: IRegistrationParams = {
            password: this.store.password
        };

        this.store.transport
            .register(params)
            .then(this.store.onSuccessRegister)
            .catch(this.store.onError);
    }
}