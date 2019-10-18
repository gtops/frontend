import * as React from "react";
import {observable} from "mobx";
import {ITableData, ITableColumn} from "../../components/table";
import {autobind} from "core-decorators";
import {IGetTrialsResponse, ITrial} from "../../services/Transport/responses";
import {AxiosError, AxiosResponse} from "axios";
import {get} from "lodash";
import {EGender} from "./EGender";
import {IGetCategoriesResponse} from "../../services/Transport/responses/IGetCategoriesResponse";
import {ICalculateResponse} from "../../services/Transport/responses/ICalculateResponse";

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
    @observable activeId = -1;

    onSuccessGetTrials(response: AxiosResponse<IGetTrialsResponse>): void {
        console.log("CalculatorStore.onSuccessGetTrials", response);
        const data = get(response, "data");
        data.data.forEach((trial: ITrial) => {
            this.data.push({data: trial, isVisible: true})
        });
    }


    onSuccessCalculate(response: AxiosResponse<ICalculateResponse>): void {
        console.log("CalculatorStore.onSuccessCalculate", response);
        this.data = this.data.map((item => {
            let line = item.data as ITrial;
            if (line.trialId != this.activeId) {
                return item;
            }
            line.secondResult = response.data.data.secondResult;
            return {data: line, isVisible: true};
        }))
    }

    onSuccessGetCategories(response: AxiosResponse<IGetCategoriesResponse[]>): void {
        this.categories = response.data;
    }

    onError(err: AxiosError): void {
        console.error(err);
    }
}