import {UserStore} from "../../../../../../components/user-store";
import {autobind} from "core-decorators";
import {JudgeCatalogStore} from "./JudgeCatalogStore";

@autobind
export class JudgeCatalogController {
    private readonly store: JudgeCatalogStore;

    constructor(store: JudgeCatalogStore) {
        this.store = store;
    }

    onComponentDidMount(): void {
        this.getJudges();
    }

    toggleFormVisibility(): void {
        this.store.isFormVisible = !this.store.isFormVisible
    }

    getJudges(): void {
        this.store.transport
            .getJudges(UserStore.getInstance().organizationId)
            .then(this.store.onSuccessGetJudges)
            .catch(this.store.onError)
    }

    onDelete(): void {
        this.deleteJudge(this.store.selectedId);
        this.store.closePopup();
    }

    deleteJudge(id: number): void {
        this.store.transport
            .removeJudge(UserStore.getInstance().organizationId, id)
            .then(this.store.onSuccessRemove)
            .then(this.getJudges)
            .catch(this.store.onError)
    }
}