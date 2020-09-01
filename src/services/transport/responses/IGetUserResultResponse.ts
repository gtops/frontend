export interface IGroup {
    group: [{
        trialName: string,
        trialId: number,
        typeTime: true,
        firstResult: string | null,
        secondResult: number | null,
        badge: string,
        resultForBronze: number,
        resultForSilver: number,
        resultForGold: number
    }],
    necessary: boolean
}

export interface IGetUserResultResponse {
    groups: IGroup[],
    ageCategory: string,
    badge: string | null,
    countTestsForBronze: number,
    countTestForSilver: number,
    countTestsForGold: number,
    orgId: number,
    eventId: number,
    teamName: string | null,
    dateOfBirth: string,
    name: string,
    id: number,
    teamId: number | null
}