import {Store} from "../../../../components/store";
import {OptionValue} from "react-selectize";
import {observable} from "mobx";
import {
    IGetEventAddedTrialsResponse, IGetEventTrialsResponse,
    IGetSportObjectResponse
} from "../../../../services/transport/responses";
import {AxiosResponse} from "axios";
import {autobind} from "core-decorators";
import {ITableData} from "../../../../components/table";
import {IJudge} from "../../../../services/transport/responses/IGetEventAddedTrialsResponse";

export interface ITrialsTableData {
    trialInEventId: number,
    trialId: number,
    trialName: string,
    trialIsTypeTime: boolean,
    tableId: number,
    eventId: number,
    sportObjectId: number,
    sportObjectName: string,
    sportObjectAddress: string,
    sportObjectDescription: string,
    referies: IJudge[]
    isAllJudgesVisible: boolean
}

@autobind
export class EventTrialsStore extends Store {
    @observable selectedTrial?: OptionValue;
    @observable trials: OptionValue[] = [];
    @observable addedTrials: ITableData[] = [];
    @observable selectedObject?: OptionValue;
    @observable sportObjects: OptionValue[] = [];
    @observable hasOrgRights = false;
    @observable canEditEvent = false;
    @observable eventId = -1;
    @observable orgId = -1;
    @observable startDate?: Date;
    @observable isFormVisible = false;

    onSuccessGetTrialsFromTable(response: AxiosResponse<IGetEventTrialsResponse[]>): void {
        console.log("[EventTrialsStore.onSuccessGetTrialsFromTable]: ", response);
        if (!response.data.length) return;

        this.trials = response.data.map(item => {
            let categories = "";
            item.ageCategories.forEach((category, index) => {
                categories += category.split("СТУПЕНЬ")[0].replace(" ", "");
                if (index === item.ageCategories.length -1) return;

                categories += ", "
            });
            return (
                {
                    label: `${item.name} (${categories})`,
                    value: item.trialId
                }
            )
        });
    }

    onSuccessGetSportObjects(response: AxiosResponse<IGetSportObjectResponse[]>): void {
        console.log("[EventTrialsStore.onSuccessGetSportObjects]: ", response);
        if (!response.data.length) return;

        this.sportObjects = response.data.map(item => {
            return (
                {
                    label: item.name,
                    value: item.sportObjectId
                }
            )
        });
    }

    onSuccessGetTrials(response: AxiosResponse<IGetEventAddedTrialsResponse[]>): void {
        console.log("[EventTrialsStore.onSuccessGetTrials]: ", response);
        this.addedTrials = response.data.map(item => {
            return {
                isVisible: true,
                data: {
                    ...item,
                    isAllJudgesVisible: false
                }
            }
        });
    }

    onSuccessAddTrial(response: AxiosResponse): void {
        console.log("[onSuccessAddTable.onSuccessAddTrial]: ", response);
        this.isError = false;
        this.message = "Вид спорта добавлен.";
        this.selectedObject = undefined;
        this.selectedTrial = undefined;
    }
}