import {autobind} from "core-decorators";
import {computed, observable} from "mobx";
import {Transport} from "../../services/transport";
import {AxiosError} from "axios";
import {getErrorCode, getErrorMessage} from "../../services/utils";
import {attempt} from "lodash";

@autobind
export class Store {
    private _transport = new Transport();
    @observable private _isCorrectData = false;
    @observable private _isError = false;
    @observable private _message = "";
    @observable private _errorCode = -1;
    @observable private _selectedId = -1;
    @observable private _isConfirmPopupVisible = false;

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

    get selectedId(): number {
        return this._selectedId;
    }

    set selectedId(value: number) {
        this._selectedId = value;
    }

    get isConfirmPopupVisible(): boolean {
        return this._isConfirmPopupVisible;
    }

    set isConfirmPopupVisible(value: boolean) {
        this._isConfirmPopupVisible = value;
    }

    onError(error: AxiosError): void {
        console.error(error);
        this._isError = true;
        this._message = getErrorMessage(error);
        this._errorCode = getErrorCode(error);
        if (this._errorCode == 401) return;

        attempt(this.onErrorImpl!, error)
    }

    closePopup(): void {
        this.selectedId = -1;
        this.isConfirmPopupVisible = false;
    }

    showPopup(id: number): void {
        this.selectedId = id;
        this.isConfirmPopupVisible = true;
    }

    onErrorImpl?(error: AxiosError): void;
}