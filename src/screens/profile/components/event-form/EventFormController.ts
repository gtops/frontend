import {EventFormStore} from "./EventFormStore";
import {autobind} from "core-decorators";
import * as React from "react";
import {UserStore} from "../../../../components/user-store";

@autobind
export class EventFormController {
    private readonly store: EventFormStore;

    constructor(store: EventFormStore) {
        this.store = store;
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        this.store.transport
            .addEvent(this.store.formValues, UserStore.getInstance().organizationId)
            .then(this.store.onSuccess)
            .catch(this.store.onError);

    }

    handleInputChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.store.formValues[name] = value;
    }
}