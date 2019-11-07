import {Transport} from "../../services/Transport";
import {ProfileStore} from "./ProfileStore";
import {autobind} from "core-decorators";

@autobind
export class ProfileController {
    private readonly transport = new Transport();
    private readonly store: ProfileStore;

    constructor(store: ProfileStore){
        this.store = store;
    }

    onComponentDidMount(): void {
        this.transport
            .getRoles()
            .then(this.store.onSuccessGetRoles)
            .catch(console.error);
    }

    onSubmit(): void {
        this.transport
            .inviteUser({
                role: this.store.selectedRoleId,
                email: this.store.email,
                token: localStorage.getItem("token") || ''
            })
            .then(console.error)
    }

    onChange(selectedOption: any): void {
        this.store.selectedRoleId = selectedOption.label;
    }

    setValue(value: string): void {
        this.store.email = value;
    }
}