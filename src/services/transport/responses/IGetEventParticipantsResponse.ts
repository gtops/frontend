export interface IGetEventParticipantsResponse {
    EventParticipantId: number,
    userId: number,
    teamId: number,
    eventId: number,
    isConfirmed: boolean,
    name: string,
    email: string,
    gender: number,
    dateOfBirth: string,
    isActivity: number,
}