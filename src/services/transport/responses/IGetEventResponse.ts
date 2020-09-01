import {EEventStatus} from "../../../screens/event-profile/EEventStatus";

export interface IGetEventResponse {
    id: number,
    organizationId: number,
    name: string,
    startDate: string,
    expirationDate: string,
    description: string,
    status: EEventStatus
}