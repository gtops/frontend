import {observable} from "mobx";

export class MenuStore {
    @observable items = ["Меню 1", "Меню 2", "Меню 3", "Меню 4", "Меню 5"];
    @observable inputValue = "";
}