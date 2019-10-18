import * as React from "react";
import {Transport} from "../../services/Transport";
import {CalculatorStore} from "./CalculatorStore";
import {autobind} from "core-decorators";
import {isNil} from "lodash";
import {IGetCalculationResultParams} from "../../services/Transport/params";
import {EGender} from "./EGender";
import {ICompetitionResult} from "../../services/Transport/responses";

@autobind
export class CalculatorController {
    private readonly transport = new Transport();
    private readonly store: CalculatorStore;

    constructor(store: CalculatorStore) {
        this.store = store;
    }

    onBlur(): void {
        const res = +this.store.old;
        if (isNil(res) || this.store.old === "") {
            return;
        }
        this.store.data.splice(0, this.store.data.length);
        const genderId = this.store.gender === EGender.MALE ? 1 : 0;
        this.transport.getTrials({gender: genderId, age: res})
            .then(this.store.onSuccessGetTrials)
            .catch(this.store.onError)
    }

    setOld(value: string): void {
        this.store.old = value;
    }

    onRadioChange(value: string): void {
        this.store.gender = value as EGender;
        this.onBlur();
    }

    onComponentDidMount(): void {
        this.transport.getCategories().then(this.store.onSuccessGetCategories).catch(this.store.onError);
    }

    onClickVisible(id: string): void {
        this.store.data = this.store.data.map(item => {
            const data = item.data as ICompetitionResult;
            return {
                data,
                isVisible: data.trial_id === id ? false : item.isVisible
            }

        })
    }

    onBlurInput(event: React.FocusEvent<HTMLInputElement>): void {
        const trialId = +event.target.accessKey;
        const primaryResult = +(event.target.value.replace(",", "."));
        if (isNaN(primaryResult) || event.target.value === "" || isNaN(trialId)) {
            return;
        }
        this.getCalculationResult(trialId, primaryResult);
    }

    private getCalculationResult(trial_id: number, primary_result: number): void {
        this.store.activeId = trial_id;
        const params: IGetCalculationResultParams = {
            age_category_id: this.store.ageCategoryId,
            primary_result,
            trial_id,
            gender_id: this.store.gender === EGender.MALE ? 1 : 0,
        };
        this.transport
            .getCalculationResult(params)
            .then(this.store.onSuccessCalculate)
            .catch(this.store.onError);
    }
}