import {OrganisationProfileStore} from "./OrganisationProfileStore";
import {autobind} from "core-decorators";
import {IOrganisationProfileProps} from "./IOrganisationProfileProps";
import {isUndefined} from "lodash";
import {UserStore} from "../../components/user-store";

@autobind
export class OrganisationProfileController {
    private readonly store: OrganisationProfileStore;

    constructor(store: OrganisationProfileStore) {
        this.store = store;
    }

    onComponentWillMount(props: IOrganisationProfileProps): void {
        if (isUndefined(props.match)) return;
        this.store.id = props.match.params.id || -1;
    }

    onComponentDidMount(): void {
        this.store.transport
            .getOrgInfo(this.store.id)
            .then(this.store.onSuccess)
            .catch(this.store.onError);

        this.getAdminsList();
    }

    onDelete(): void {
        this.deleteAdmin(this.store.id, this.store.selectedId);
        this.store.closePopup();
    }

    deleteAdmin(orgId: number, adminId: number): void {
        this.store.transport
            .removeLocalAdmins(orgId, adminId)
            .then(this.getAdminsList)
            .catch(this.store.onError)
    }

    private getAdminsList(): void {
        this.store.transport
            .getLocalAdmins(this.store.id)
            .then(this.store.onSuccessGetAdmins)
            .catch(this.store.onError)
    }
}