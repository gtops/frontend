import {UserStore} from "../../components/user-store";
import {RegistrationStore} from "./RegistrationStore";
import {IRegistrationParams} from "../../services/transport/params";

export class RegistrationController {
    private readonly store: RegistrationStore;

    constructor(store: RegistrationStore){
        this.store = store;
    }

    onComponentWillMount(): void {
        const parsedUrl = window.location.pathname.split("/");
        if (parsedUrl.length < 2) {
            return;
        }
        UserStore.getInstance().token = parsedUrl[parsedUrl.length - 1];
        history.replaceState("", "", "/user/invite");
        this.store.transport.validateToken().then(this.store.onSuccessValidateToken);
    }

    onSubmit(): void {
        const params: IRegistrationParams = {
            name: this.store.name,
            token: UserStore.getInstance().token,
            password: this.store.password
        };

        this.store.transport
            .register(params)
            .then(this.store.onSuccessRegister)
            .catch(this.store.onError);
    }
}