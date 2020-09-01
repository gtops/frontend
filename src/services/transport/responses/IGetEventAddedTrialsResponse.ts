export interface IJudge {
    refereeOnTrialInEventId: number,
    trialInEventId: number,
    userId: number,
    name: string,
    email: string,
    dateOfBirth: string,
    gender: number
}

export interface IGetEventAddedTrialsResponse {
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
}