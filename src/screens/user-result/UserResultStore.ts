import {observable} from "mobx";
import {autobind} from "core-decorators";
import {ITableColumn, ITableData} from "../../components/table";
import * as React from "react";
import {Store} from "../../components/store";
import {EResult} from "./EResult";
import {EResultTypes} from "./EResultTypes";
import {IGetUserResultResponse} from "../../services/transport/responses";
import {AxiosResponse} from "axios";

export interface IResultData {
    trialName: string,
    trialId: number,
    secondResult: number,
    firstResult: string,
    result: EResult,
    resultType: EResultTypes,
    resultTrialOnEventId: number
}

@autobind
export class UserResultStore extends Store {
    @observable data: ITableData[] = [];
    @observable cell?: (data: object) => React.ReactNode;
    @observable selectedInputId = -1;
    @observable eventId = -1;
    @observable orgId = -1;
    @observable userId = -1;
    @observable countTestsForBronze = 0;
    @observable countTestForSilver = 0;
    @observable countTestsForGold = 0;
    @observable badge = "";
    @observable ageCategory = "";
    @observable teamName = "";
    @observable userName = "";
    @observable teamId = -1;
    @observable dateOfBirth = "";

    setCurrInput(id: number): void {
        this.selectedInputId = id;
    }

    onSuccessGetUserResult(response: AxiosResponse<IGetUserResultResponse>): void {
        console.log("UserResultStore.onSuccessGetUserResult", response);
        this.countTestForSilver = response.data.countTestForSilver;
        this.countTestsForBronze = response.data.countTestsForBronze;
        this.countTestsForGold = response.data.countTestsForGold;
        this.badge = response.data.badge || "";
        this.ageCategory = response.data.ageCategory;
        this.orgId = response.data.orgId;
        this.teamName = response.data.teamName || "";
        this.userName = response.data.name;
        this.dateOfBirth = response.data.dateOfBirth;
        this.userId = response.data.id;
        this.teamId = response.data.teamId || -1;
        this.data = [];
        let res = [];
        response.data.groups.map((item, index) => {
            if (index !== 0) {
                this.data.push({
                    isVisible: true,
                    header: "" ,
                });
            }
            res = item.group.map(group => {
                return {
                    isVisible: true,
                    data: {
                        ...group,
                        resultType: group.typeTime ? EResultTypes.TIME : EResultTypes.COUNT,
                        secondResult: group.secondResult || 0,
                        isNecessary: item.necessary ? "да" : "нет"
                    }
                }
            });
            this.data = this.data.concat(res);
        })
    }

    getBadgeValue(label: string): string {
        switch (label) {
            case "золото":
                return "gold";
            case "серебро":
                return "silver";
            case "бронза":
                return "bronze";
        }

        return "";
    }
}