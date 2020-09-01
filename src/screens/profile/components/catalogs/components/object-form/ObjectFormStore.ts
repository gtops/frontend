import {Store} from "../../../../../../components/store";
import {autobind} from "core-decorators";
import {observable} from "mobx";
import {AxiosResponse} from "axios";
import {attempt} from "lodash";

@autobind
export class ObjectFormStore extends Store {
    EMPTY_FORM_VALUES = {
        name: "",
        address: "",
        description: ""
    };
    onSuccessProp?: () => void;
    @observable formValues = this.EMPTY_FORM_VALUES;

    onSuccess(response: AxiosResponse): void {
        console.log("[ObjectFormStore.onSuccess]: ", response);
        attempt(this.onSuccessProp!);
        this.message = "Спортивный объект добавлен.";
        this.isError = false;
    }
}