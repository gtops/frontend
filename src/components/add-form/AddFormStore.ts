import {autobind} from "core-decorators";
import {observable} from "mobx";

@autobind
export class AddFormStore {
    @observable isFormVisible = false;
}