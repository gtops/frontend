export interface ICard {
    title: string;
    link: string;
    className: string;
}
export class HomeStore {
    cards = [
        {title: "участникам", link: "", className: "participant"},
        {title: "организаторам", link: "", className: "organizer"},
        {title: "командам", link: "", className: "team"},
        {title: "судьям", link: "", className: "judge"}
    ];
}