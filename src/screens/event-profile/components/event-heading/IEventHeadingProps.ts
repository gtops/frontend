import {Subject} from "rxjs";

export interface IEventHeadingProps {
    orgId: number,
    eventId: number,
    canEditEvent: boolean,
    hasOrgRights: boolean,
    update: Subject<void>
}