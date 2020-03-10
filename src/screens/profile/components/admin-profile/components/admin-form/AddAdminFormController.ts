import * as React from "react";
import {AddAdminFormStore} from "./AddAdminFormStore";
import {isEmpty} from "lodash";
import {autobind} from "core-decorators";

@autobind
export class AddAdminFormController {
    private readonly store: AddAdminFormStore;

    constructor(store: AddAdminFormStore) {
        this.store = store;
    }

    onChangeRadio(): void {
        this.store.isAddChecked = !this.store.isAddChecked;
    }

    onComponentDidMount(): void {
        this.store.transport
            .getOrgsList()
            .then(this.store.onSuccessGetOrgsList)
            .catch(this.store.onError);
    }

    onChangeAdminSelect(selectedOption: any): void {
        this.store.selectedAdminId = selectedOption.value;
    }

    onChange(selectedOption: any): void {
        this.store.selectedOrgId = selectedOption.value;
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (this.store.selectedOrgId === -1) {
            this.store.isError = true;
            this.store.popupText = "Не выбрана организация.";
            this.store.isPopupVisible = true;
            return;
        }

        if (this.store.isAddChecked) {
            this.addNewAdmin();
        } else {
            this.addExistingAdmin();
        }

    }

    private addExistingAdmin(): void {
        if (isEmpty(this.store.email)) {
            this.store.isError = true;
            this.store.popupText = "Введите почту.";
            this.store.isPopupVisible = true;
            return;
        }

        this.store.transport
            .addExistingLocalAdmin(this.store.email, this.store.selectedOrgId)
            .then(this.store.onSuccess)
            .catch(this.store.onError);
    }

    private addNewAdmin(): void {
        if (!this.validateAdminForm()) {
            this.store.isError = true;
            this.store.popupText = "Все поля должны быть заполнены.";
            this.store.isPopupVisible = true;
            return;
        }
        this.store.transport
            .addLocalAdmin(this.store.adminValues, this.store.selectedOrgId)
            .then(this.store.onSuccess)
            .catch(this.store.onError);
    }

    handleCloseClick(): void {
        this.store.isPopupVisible = false;
        if (!this.store.isError) {
            this.store.adminValues = this.store.EMPTY_ADMIN_VALUES;
            this.store.email = "";
        }
        this.store.popupText = "";
        this.store.isError = false;
    }

    validateAdminForm(): boolean {
        let values = this.store.adminValues;
        return !isEmpty(values.name) && !isEmpty(values.email) && !isEmpty(values.password)
    }


    handleInputAdminChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.store.adminValues[name] = value;
    }

    handleInputEmailChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.store.email = event.target.value;
    }
}