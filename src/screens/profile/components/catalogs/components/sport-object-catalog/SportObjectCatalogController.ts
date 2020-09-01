import {UserStore} from "../../../../../../components/user-store";
import {SportObjectCatalogStore} from "./SportObjectCatalogStore";
import {autobind} from "core-decorators";

@autobind
export class SportObjectCatalogController {
    private readonly store: SportObjectCatalogStore;

    constructor(store: SportObjectCatalogStore) {
        this.store = store;
    }

    onComponentDidMount(): void {
        this.getObjects();
    }

    toggleFormVisibility(): void {
        this.store.isFormVisible = !this.store.isFormVisible
    }

    onDelete(): void {
        this.deleteObject(this.store.selectedId);
        this.store.closePopup();
    }

    getObjects(): void {
        this.store.transport
            .getSportObject(UserStore.getInstance().organizationId)
            .then(this.store.onSuccessGetSportObject)
            .catch(this.store.onError)
    }

    deleteObject(id: number): void {
        this.store.transport
            .removeSportObject(UserStore.getInstance().organizationId, id)
            .then(this.store.onSuccessRemove)
            .then(this.getObjects)
            .catch(this.store.onError)
    }
}