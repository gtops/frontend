export interface IParticipant {
    userId: number,
    userName: string,
    teamId: number,
    teamName: string,
    dateOfBirth: string,
    gender: number,
    firstResult: string,
    secondResult: string,
    badge: string,
    resultOfTrialInEventId: number
}

export interface IGetTrialResultResponse {
    participants: IParticipant[],
    trialName: string,
    isTypeTime: boolean,
    eventId: number,
    orgId: number
}