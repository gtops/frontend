import {CommonProfileController} from "../common-profile/CommonProfileController";
import {AdminProfileStore} from "./AdminProfileStore";
import {autobind} from "core-decorators";

@autobind
export class AdminProfileController extends CommonProfileController {
    protected store: AdminProfileStore;

    constructor(store: AdminProfileStore) {
        super();
        this.store = store;
    }

    onComponentDidMount(): void {
        this.store.transport
            .getRoles()
            .then(this.store.onSuccessGetRoles)
            .catch(console.error);
    }

    onSubmit(): void {
        this.store.transport
            .inviteUser({
                role: this.store.selectedRoleId,
                email: this.store.email,
            })
            .then(this.store.onSuccessInvite)
            .catch(this.store.onError)
    }

    onChange(selectedOption: any): void {
        this.store.selectedRoleId = selectedOption.label;
    }

    setValue(value: string): void {
        this.store.email = value;

        if (this.store.isSuccessPopupVisible) {
            this.store.isSuccessPopupVisible = false;
        }
    }
}