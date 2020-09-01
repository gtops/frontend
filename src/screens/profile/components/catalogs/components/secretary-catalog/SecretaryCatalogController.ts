import {autobind} from "core-decorators";
import {SecretaryCatalogStore} from "./SecretaryCatalogStore";
import {UserStore} from "../../../../../../components/user-store/index";

@autobind
export class CatalogsController {
    private readonly store: SecretaryCatalogStore;

    constructor(store: SecretaryCatalogStore) {
        this.store = store;
    }

    onComponentDidMount(): void {
        this.getSecretaries();
    }

    toggleFormVisibility(): void {
        this.store.isFormVisible = !this.store.isFormVisible
    }

    onDelete(): void {
        this.deleteSecretary(this.store.selectedId);
        this.store.closePopup();
    }

    getSecretaries(): void {
        this.store.transport
            .getSecretariesCatalog(UserStore.getInstance().organizationId)
            .then(this.store.onSuccessGetSecretariesCatalog)
            .catch(this.store.onError)
    }

    deleteSecretary(id: number): void {
        this.store.transport
            .removeSecretaryFromOrg(UserStore.getInstance().organizationId, id)
            .then(this.store.onSuccessRemove)
            .then(this.getSecretaries)
            .catch(this.store.onError)
    }
}