import {observable} from "mobx";

export interface IBreadcrumbsItem {
    title: string,
    link: string
}

export class BreadcrumbsStore {
    @observable items: IBreadcrumbsItem[] = []
}