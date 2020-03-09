import {autobind} from "core-decorators";
import {computed, observable} from "mobx";
import {Transport} from "../../services/transport";
import {AxiosError} from "axios";

@autobind
export class Store {
    private _transport = new Transport();
    @observable private _isCorrectData = false;
    @observable private _isError = false;

    get transport(): Transport {
        return this._transport;
    }

    set transport(value: Transport) {
        this._transport = value;
    }

    @computed get isCorrectData(): boolean {
        return this._isCorrectData;
    }

    set isCorrectData(value: boolean) {
        this._isCorrectData = value;
    }

    get isError(): boolean {
        return this._isError;
    }

    set isError(value: boolean) {
        this._isError = value;
    }

    onError(error: AxiosError): void {
        this._isError = true;
        console.error(error);
    }
}