import {observable} from "mobx";
import {IMenuItem} from "./IMenuItem";

export class MenuStore {
    @observable items: IMenuItem[] = [
        {title: "Калькулятор", onClick: MenuStore.onCalcItemClick},
        {title: "Меню 2", onClick: MenuStore.onCalcItemClick},
        {title: "Меню 3", onClick: MenuStore.onCalcItemClick},
        {title: "Меню 4", onClick: MenuStore.onCalcItemClick},
        {title: "Меню 5", onClick: MenuStore.onCalcItemClick}
    ];
    @observable inputValue = "";

    private static onCalcItemClick(): void {
        window.location.replace("/calculator")
    }
}