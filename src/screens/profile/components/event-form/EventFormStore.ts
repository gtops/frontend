import {Store} from "../../../../components/store";
import {observable} from "mobx";
import {IAddEventParams} from "../../../../services/transport/params";
import {autobind} from "core-decorators";
import {AxiosResponse} from "axios";

@autobind
export class EventFormStore extends Store {
    EMPTY_FORM_VALUES: IAddEventParams = {
        name: "",
        startDate: "",
        expirationDate: "",
        description: ""
    };
    @observable formValues: IAddEventParams = this.EMPTY_FORM_VALUES;

    onSuccess(response: AxiosResponse): void {
        console.log("[EventFormStore.onSuccess]: ", response);
    }
}