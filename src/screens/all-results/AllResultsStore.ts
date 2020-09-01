import {Store} from "../../components/store";
import {autobind} from "core-decorators";
import {observable} from "mobx";
import {AxiosResponse} from "axios";
import {IGetEventResultsResponse} from "../../services/transport/responses";
import {isEmpty} from "lodash";

interface IParticipantAllResults {
    userId: number,
    userName: string,
    badge: string
}

interface ITrialAllResults {
    participants: [{
        userId: number,
        resultOfTrialInEventId: number,
        userName: string,
        teamId: number,
        teamName: string,
        dateOfBirth: string,
        gender: number,
        firstResult: string,
        secondResult: string,
        badge: string,
        orgId: number,
        eventId: number
    }],
    trialName: string,
    isTypeTime: true,
    eventStatus: string,
    orgId: number
}
@autobind
export class AllResultsStore extends Store {
    @observable data: ITrialAllResults[] = [];
    @observable allParticipants: IParticipantAllResults[] = [];
    @observable orgId = -1;
    @observable eventId = -1;

    onSuccessGetResult(response: AxiosResponse<IGetEventResultsResponse>): void {
        console.log(response);
        this.data = response.data.trials;
        const added: number[] = [];

        if (isEmpty(response.data.trials)) return;

        this.orgId = response.data.trials[0].orgId;
        this.allParticipants = response.data.participants.map(participant => {
            return {
                ...participant,
                userName: ""
            }
        });

        response.data.trials.map(trial => {
            trial.participants.map(participant => {
                if (added.indexOf(participant.userId) !== -1) return;
                added.push(participant.userId);
                this.allParticipants.map(value => {
                    if (participant.userId !== value.userId) return;
                    value.userName = participant.userName;
                });
            })
        })
    }
}