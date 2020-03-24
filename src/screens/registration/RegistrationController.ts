import {UserStore} from "../../components/user-store";
import {RegistrationStore} from "./RegistrationStore";
import {IRegistrationParams} from "../../services/transport/params";
import {autobind} from "core-decorators";
import {getQueryParams} from "../../services/utils";
import {isUndefined} from "lodash";
import {EPath} from "../../EPath";

@autobind
export class RegistrationController {
    private readonly store: RegistrationStore;

    constructor(store: RegistrationStore) {
        this.store = store;
    }

    onComponentWillMount(): void {
        let params = getQueryParams(window.location.search);
        if (isUndefined(params.email) || isUndefined(params.token)) {
            return;
        }
        history.replaceState("", "", EPath.INVITE_USER);
        UserStore.getInstance().token = params.token;
        this.store.email = params.email;
        console.log(this.store.email)
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