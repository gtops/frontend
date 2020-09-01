import {autobind} from "core-decorators";
import {Store} from "../../../../components/store";
import {observable} from "mobx";
import {IAddSecretaryParams} from "../../../../services/transport/params";
import {getFormattedDate} from "../../../../services/utils";
import {AxiosError, AxiosResponse} from "axios";
import {attempt} from "lodash";

@autobind
export class SecretaryFormStore extends Store {
    EMPTY_FORM_VALUES = {
        name: "",
        email: "",
        dateOfBirth: getFormattedDate(new Date()),
        gender: 0
    };
    orgId = -1;
    onSuccessProp?: () => void;
    @observable isAddChecked = true;
    @observable email = "";
    @observable formValues: IAddSecretaryParams = this.EMPTY_FORM_VALUES;

    onSuccess(response: AxiosResponse): void {
        console.log("[SecretaryFormStore.onSuccess]: ", response);
        this.isError = false;
        this.message = "Секретарь успешно добвален.";
        attempt(this.onSuccessProp!)
    }
}