import * as React from "react";
import {observable} from "mobx";
import {ITableData, ITableColumn} from "../../components/table";
import {autobind} from "core-decorators";
import {IGetTrialsResponse, ITrial} from "../../services/Transport/responses";
import {AxiosError, AxiosResponse} from "axios";
import {get} from "lodash";
import {EGender} from "./EGender";
import {IGetCategoriesResponse} from "../../services/Transport/responses/IGetCategoriesResponse";

@autobind
export class CalculatorStore {
    @observable data: ITableData[] = [];
    @observable cell?: (data: object) => React.ReactNode;
    @observable nameCell?: (data: object) => React.ReactNode;
    @observable columns: ITableColumn[] = [];
    @observable gender = EGender.MALE;
    @observable old = "";
    @observable ageCategoryId = -1;
    @observable categories: IGetCategoriesResponse[] = [];

    onSuccessGetTrials(response: AxiosResponse<IGetTrialsResponse>): void {
        console.log("CalculatorStore.onSuccessGetTrials", response);
        const data = get(response, "data");
        this.ageCategoryId = data.age_category_id;
        const trials = get (data, "trials");
        trials.forEach(item => {
            const res = get(item, "trial_group");
            res.forEach((trial: ITrial) => {
                this.data.push({data: trial, isVisible: true})
            })
        });
    }

    onSuccessCalculate(r: AxiosResponse<IGetTrialsResponse>): void {
        console.log(r)
    }

    onSuccessGetCategories(response: AxiosResponse<IGetCategoriesResponse[]>): void {
        this.categories = response.data;
    }

    onError(err: AxiosError): void {
        console.error(err);
    }
}