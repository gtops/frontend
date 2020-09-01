export interface IEventTrialsProps {
    orgId: number;
    eventId: number;
    canEditEvent: boolean;
    hasOrgRights: boolean;
    startDate: Date;
    expirationDate: Date;
}