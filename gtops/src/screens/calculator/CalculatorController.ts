import * as React from "react";
import {Transport} from "../../services/Transport";
import {CalculatorStore} from "./CalculatorStore";
import {autobind} from "core-decorators";
import {isNil} from "lodash";
import {IGetTrialsResponse} from "../../services/Transport/responses/IGetTrialsResponse";

@autobind
export class CalculatorController {
    private readonly transport = new Transport();
    private readonly store: CalculatorStore;

    constructor(store: CalculatorStore) {
        this.store = store;
    }

    onBlur(): void {
        const res = +this.store.old;
        if (isNil(res)) {
            return;
        }
        const genderId = this.store.gender === "мужской" ? 1 : 2;
        this.transport.getTrials({gender_id: genderId, old: res})
            .then(this.store.onSuccessGetTrials)
            .catch(this.store.onError)
    }

    setOld(value: string): void {
        this.store.old = value;
    }

    onRadioChange(value: string): void {
        this.store.gender = value;
    }

    onBlurInput(event: React.FocusEvent<HTMLInputElement>): void {
        // console.log(event.target.accessKey);
    }
}