export interface IGetOrgsListResponse {
    id: number,
    name: string,
    address: string,
    leader: string,
    phone_number: string,
    OQRN: string,
    payment_account: string,
    branch: string,
    bik: string,
    countOfAllEvents: number,
    countOfActiveEvents: number,
    correspondent_account: string;
    [key: string]: string | number;
}
