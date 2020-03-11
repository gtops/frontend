import {Store} from "../../../../components/store";
import {observable} from "mobx";
import {IAddEventParams} from "../../../../services/transport/params";
import {autobind} from "core-decorators";
import {AxiosError, AxiosResponse} from "axios";

@autobind
export class EventFormStore extends Store {
    EMPTY_FORM_VALUES: IAddEventParams = {
        name: "",
        startDate: this.getFormattedDate(new Date()),
        expirationDate:  this.getFormattedDate(new Date()),
        description: ""
    };
    @observable formValues: IAddEventParams = this.EMPTY_FORM_VALUES;
    @observable isPopupVisible = false;
    @observable popupText = "";

    onSuccess(response: AxiosResponse): void {
        console.log("[EventFormStore.onSuccess]: ", response);
        this.isPopupVisible = true;
        this.popupText = "Мероприятие успешно добавлено."
    }

    onError(error: AxiosError): void {
        this.isError = true;
        let errors = error.response ? error.response.data.errors : [];
        let message = errors.length > 0 ? errors[0].description : "";
        this.popupText = `Произошла ошибка. Статус: ${message}`;
        this.isPopupVisible = true;
        console.error(error);
    }

    getFormattedDate(date: Date): string {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        let formattedMonth = month < 10 ? "0" + month : month.toString();
        let formattedDay = day < 10 ? "0" + day : day.toString();
        return `${year}-${formattedMonth}-${formattedDay}`
    }
}