import {CommonProfileController} from "../../../common-profile/CommonProfileController";
import {OrgsListStore} from "./OrgsListStore";
import {autobind} from "core-decorators";

@autobind
export class OrgsListController extends CommonProfileController {
    protected readonly store: OrgsListStore;

    constructor(store: OrgsListStore) {
        super();
        this.store = store;
    }

    onComponentDidMount(): void {
        this.store.transport
            .getOrgsList()
            .then(this.store.onSuccessGetOrgsList)
            .catch(this.store.onError);
    }


    deleteOrg(id: number) {
        this.store.transport.deleteOrg(id).then(this.onComponentDidMount).catch(console.log)
    }
}