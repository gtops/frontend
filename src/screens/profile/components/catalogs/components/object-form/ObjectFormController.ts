import {autobind} from "core-decorators";
import {isEmpty} from "lodash";
import {ObjectFormStore} from "./ObjectFormStore";
import * as React from "react";
import {UserStore} from "../../../../../../components/user-store";

@autobind
export class ObjectFormController {
    private readonly store: ObjectFormStore;

    constructor(store: ObjectFormStore) {
        this.store = store;
    }

    handleInputChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>): void {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        if (name == "name") {
            this.store.formValues.name = value
        } else if (name == "address") {
            this.store.formValues.address = value
        } else {
            this.store.formValues.description = value
        }
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        if (!this.validateForm()) {
            this.store.isError = true;
            this.store.message = "Все поля должны быть заполнены.";
            return;
        }
        this.store.transport
            .addSportObject(UserStore.getInstance().organizationId, this.store.formValues)
            .then(this.store.onSuccess)
            .catch(this.store.onError)
    }

    private validateForm(): boolean {
        return (
            !isEmpty(this.store.formValues.description) &&
            !isEmpty(this.store.formValues.address) &&
            !isEmpty(this.store.formValues.name)
        )
    }

    onClosePopup(): void {
        this.store.message = "";
        this.store.formValues = this.store.EMPTY_FORM_VALUES;
    }
}