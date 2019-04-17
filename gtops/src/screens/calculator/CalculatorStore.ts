import * as React from "react";
import {observable} from "mobx";
import {ITableData} from "../../components/table/ITableData";
import {ITableColumn} from "../../components/table";
import {autobind} from "core-decorators";
import {IGetTrialsResponse, ITrial} from "../../services/Transport/responses/IGetTrialsResponse";
import {AxiosError, AxiosResponse} from "axios";
import {get} from "lodash";

@autobind
export class CalculatorStore {
    @observable data: ITableData[] = [];
    @observable cell?: (data: object) => React.ReactNode;
    @observable columns: ITableColumn[] = [];
    @observable gender = "";
    @observable old = "";

    onSuccessGetTrials(response: AxiosResponse<IGetTrialsResponse>): void {
        // this.data = [];
        const data = get(response, "data");
        const trials = get (data, "trials");
        trials.forEach(item => {
            const res = get(item, "trial_group");
            res.forEach((trial: ITrial) => {
                this.data.push({data: trial})
            })
        });
    }

    onError(err: AxiosError): void {
        console.error(err);
    }
}