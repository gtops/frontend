import {observable} from "mobx";
import {IMenuItem} from "./IMenuItem";

export class MenuStore {
    @observable items: IMenuItem[] = [
        {title: "Личный кабинет", link: "#"},
        {title: "Результаты", link: "#"},
        {title: "Информация", link: "#"},
        {title: "Сми", link: "#"},
        {title: "Калькулятор", link: "/calculator"},
        {title: "Партнерам", link: "#"},
    ];

    private static onCalcItemClick(): void {
        window.location.replace("/calculator")
    }
}