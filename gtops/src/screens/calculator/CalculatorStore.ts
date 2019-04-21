import * as React from "react";
import {observable} from "mobx";
import {ITableData, ITableColumn} from "../../components/table";
import {autobind} from "core-decorators";
import {IGetTrialsResponse, ITrial} from "../../services/Transport/responses";
import {AxiosError, AxiosResponse} from "axios";
import {get} from "lodash";
import {EGender} from "./EGender";

@autobind
export class CalculatorStore {
    @observable data: ITableData[] = [];
    @observable cell?: (data: object) => React.ReactNode;
    @observable columns: ITableColumn[] = [];
    @observable gender = EGender.MALE;
    @observable old = "";
    @observable ageCategoryId = -1;

    onSuccessGetTrials(response: AxiosResponse<IGetTrialsResponse>): void {
        console.log("CalculatorStore.onSuccessGetTrials", response);
        const data = get(response, "data");
        this.ageCategoryId = data.age_category_id;
        const trials = get (data, "trials");
        trials.forEach(item => {
            const res = get(item, "trial_group");
            res.forEach((trial: ITrial) => {
                this.data.push({data: trial})
            })
        });
    }

    onSuccessCalculate(r: AxiosResponse<IGetTrialsResponse>): void {
        console.log(r)
    }

    onError(err: AxiosError): void {
        console.error(err);
    }
}