import {autobind} from "core-decorators";
import {computed, observable} from "mobx";
import {Transport} from "../../services/transport";
import {AxiosError} from "axios";

@autobind
export class Store {
    private _transport = new Transport();
    @observable private _isCorrectData = false;

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


    onError(error: AxiosError): void {
        console.error(error);
    }
}