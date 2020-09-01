import { Subject } from "rxjs";

export interface IEventParticipantsProps {
    eventId: number;
    canEditEvent: boolean;
    update: Subject<void>;
    hasOrgRights: boolean
}