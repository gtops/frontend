import {EPath} from "../../EPath";

export interface ICard {
    title: string;
    link: string;
    className: string;
}
export class HomeStore {
    cards = [
        {title: "участникам", link: EPath.CALCULATOR, className: "participant"},
        {title: "организаторам", link: "", className: "organizer"},
        {title: "командам", link: "", className: "team"},
        {title: "судьям", link: "", className: "judge"}
    ];
}