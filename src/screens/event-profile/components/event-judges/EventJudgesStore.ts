import {Store} from "../../../../components/store";
import {autobind} from "core-decorators";
import {AxiosResponse} from "axios";
import {observable} from "mobx";
import {ITableData} from "../../../../components/table";
import {
    IGetEventAddedTrialsResponse, IGetJudgesResponse, IGetSecretaries,
    IGetTeamsResponse
} from "../../../../services/transport/responses";
import {OptionValue} from "react-selectize";
import {getDateString} from "../../../../services/utils";

@autobind
export class EventJudgesStore extends Store {
    @observable eventId = -1;
    @observable orgId = -1;
    @observable judgesCatalog: OptionValue[] = [];
    @observable selectedJudge?: OptionValue;
    @observable selectedTrial?: OptionValue;
    @observable trials: OptionValue[] = [];

    onSuccessAccept(response: AxiosResponse): void {
        console.log("[EventParticipantsStore.onSuccessAccept]: ", response);
    }

    onSuccessDelete(response: AxiosResponse): void {
        console.log("[EventParticipantsStore.onSuccessDelete]: ", response);
    }

    onSuccessGetTrials(response: AxiosResponse<IGetEventAddedTrialsResponse[]>): void {
        console.log("[EventTrialsStore.onSuccessGetTrials]: ", response);
        this.trials = response.data.map(item => {
            return {
                value: item.trialInEventId,
                label: item.trialName
            }

        })
    }

    onSuccessAddJudgeInEvent(response: AxiosResponse): void {
        console.log("[EventJudgesStore.onSuccessAddJudgeInEvent]: ", response);
        this.selectedJudge = undefined;
        this.selectedTrial = undefined;
        this.message = "Судья добавлен.";
        this.isError = false;
    }

    onSuccessGetJudgesCatalog(response: AxiosResponse<IGetJudgesResponse[]>): void {
        console.log("[EventJudgesStore.onSuccessGetJudgesCatalog]: ", response);
        if (!response.data.length) return;

        this.judgesCatalog = response.data.map(item => {
            return (
                {
                    label: `${item.name} (${item.email})`,
                    value: item.refereeOnOrganizationId
                }
            )
        });
    }

    onSuccessDeleteSecretary(response: AxiosResponse): void {
        console.log("[EventJudgesStore.onSuccessDeleteSecretary]: ", response);
    }
}