export interface IGetEventResultsResponse {
    trials: [{
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
    }],
    participants: [{
        userId: number,
        badge: string,
    }],
}