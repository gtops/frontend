import {autobind} from "core-decorators";
import {EventSecretaryStore} from "./EventSecretaryStore";
import {IEventSecretaryProps} from "./IEventSecretaryProps";
import * as React from "react";
import {isUndefined} from "lodash";
import {OptionValue} from "react-selectize";

@autobind
export class EventSecretaryController {
    private readonly store: EventSecretaryStore;

    constructor(store: EventSecretaryStore) {
        this.store = store;
    }

    onComponentWillMount(props: IEventSecretaryProps): void {
        this.store.eventId = props.eventId;
        this.store.orgId = props.orgId;
    }

    onComponentDidMount(): void {
        this.getOrgSecretaries();
        this.getSecretaries();
    }

    private getSecretaries(): void {
        this.store.transport
            .getSecretaries(this.store.orgId, this.store.eventId)
            .then(this.store.onSuccessGetSecretaries)
            .catch(this.store.onError);
    }

    private getOrgSecretaries(): void {
        this.store.transport
            .getSecretariesCatalog(this.store.orgId)
            .then(this.store.onSuccessGetSecretariesCatalog)
            .catch(this.store.onError)
    }

    deleteSecretary(secretaryId: number): void {
        this.store.transport
            .removeSecretary(this.store.orgId, this.store.eventId, secretaryId)
            .then(this.store.onSuccessDeleteSecretary)
            .then(this.getSecretaries)
            .catch(this.store.onError);
    }

    onDelete(): void {
        this.deleteSecretary(this.store.selectedId);
        this.store.closePopup();
    }

    handleSubmitSecretaryForm(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        if (isUndefined(this.store.selectedSecretary)) {
            this.store.isError = true;
            this.store.message = "Выберите секретаря";
            return;
        }
        this.store.transport
            .addSecretaryInEvent(this.store.orgId, this.store.eventId, this.store.selectedSecretary.value)
            .then(this.store.onSuccessAddSecretaryInEvent)
            .then(this.getSecretaries)
            .catch(this.store.onError)
    }

    onValueSecretaryChange(value: OptionValue): void {
        this.store.selectedSecretary = value;
    }
}