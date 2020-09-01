import {Store} from "../../components/store";
import {autobind} from "core-decorators";
import {observable} from "mobx";
import {IGetTrialResultResponse} from "../../services/transport/responses";
import {AxiosResponse} from "axios";
import {ITableData} from "../../components/table";
import {EResultTypes} from "../user-result/EResultTypes";
import {getDateString} from "../../services/utils";

@autobind
export class TrialResultStore extends Store {
    @observable trialInEventId = -1;
    @observable orgId = -1;
    @observable eventId = -1;
    @observable data: ITableData[] = [];
    @observable name = "";
    @observable type = EResultTypes.COUNT;
    @observable userId = "";
    @observable findError = false;

    onSuccessGetTrialResult(response: AxiosResponse<IGetTrialResultResponse>): void {
        console.log("[TrialResultStore.onSuccessGetTrialResult]", response);
        this.name = response.data.trialName;
        this.type = response.data.isTypeTime ? EResultTypes.TIME : EResultTypes.COUNT;
        this.orgId = response.data.orgId;
        this.eventId = response.data.eventId;
        this.data = response.data.participants.map(item => {
            return (
                {
                    isVisible: true,
                    data: {
                        ...item,
                        secondResult: item.secondResult || 0,
                        dateOfBirth: getDateString(item.dateOfBirth),
                        teamName: item.teamName === null ? "" : item.teamName
                    }
                }
            )
        })
    }
}