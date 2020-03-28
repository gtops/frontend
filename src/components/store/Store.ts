import {autobind} from "core-decorators";
import {computed, observable} from "mobx";
import {Transport} from "../../services/transport";
import {AxiosError} from "axios";
import {getErrorMessage} from "../../services/utils";
import {attempt} from "lodash";

@autobind
export class Store {
    private _transport = new Transport();
    @observable private _isCorrectData = false;
    @observable private _isError = false;
    @observable private _message = "";

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

    get message(): string {
        return this._message;
    }

    set message(value: string) {
        this._message = value;
    }

    onError(error: AxiosError): void {
        console.error(error);
        this._isError = true;
        this._message = getErrorMessage(error);
        attempt(this.onErrorImpl!, error)
    }

    onErrorImpl?(error: AxiosError): void;
}