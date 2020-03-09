import {CommonProfileController} from "../common-profile/CommonProfileController";
import {AdminProfileStore} from "./AdminProfileStore";
import {autobind} from "core-decorators";
import * as React from "react";

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

        this.store.transport
            .getOrgsList()
            .then(this.store.onSuccessGetOrgsList)
            .catch(this.store.onError);
    }

    onSubmit(event: React.FormEvent<HTMLFormElement>): void {
        if (!this.store.editFormValues.id) return;
        event.preventDefault();

        let id = +this.store.editFormValues.id;
        if (isNaN(id)) return;

        this.store.transport
            .editOrgInfo(this.store.editFormValues, this.store.selectedOrgId)
            .then(this.store.onSuccessEdit)
            .catch(this.store.onError);

    }

    onChange(selectedOption: any): void {
        let id = selectedOption.value;
        let value = this.store.orgsList.find((item) => item.id == id);
        this.store.selectedOrgId = id;

        if (!value) return;

        this.store.editFormValues = {
            phoneNumber: value.phone_number,
            oqrn: value.OQRN,
            paymentAccount: value.payment_account,
            correspondentAccount: value.correspondent_account,
            name: value.name,
            bik: value.bik,
            branch: value.branch,
            address: value.address,
            leader: value.leader
        }
    }

    setValue(value: string): void {
        this.store.email = value;

        if (this.store.isSuccessPopupVisible) {
            this.store.isSuccessPopupVisible = false;
        }
    }


    handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.store.addFormValues[name] = value;
    }

    handleEditInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.store.editFormValues[name] = value;
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.store.transport
            .inviteOrg(this.store.addFormValues)
            .then(console.log)
            .catch(this.store.onError);
    }

    deleteOrg(id: number) {
        this.store.transport.deleteOrg(id).then(console.log)
    }
}