export interface ITrial {
    trialName: string;
    resultForBronze: number;
    resultForSilver: number;
    resultForGold: number;
    trialId: number;
    secondResult?: number;
}

interface ITrialGroup {
    trial_group: ITrial[]
}

export interface IGetTrialsResponse {
    data: ITrial[];
}