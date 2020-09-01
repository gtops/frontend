import {autobind} from "core-decorators";
import {EventTeamsStore} from "./EventTeamsStore";
import {IEventTeamsProps} from "./IEventTeamsProps";
import * as React from "react";

@autobind
export class EventTeamsController {
    private readonly store: EventTeamsStore;

    constructor(store: EventTeamsStore) {
        this.store = store;
    }

    onComponentWillMount(props: IEventTeamsProps): void {
        this.store.eventId = props.eventId;
        this.store.orgId = props.orgId;
        this.store.canEditEvent = props.canEditEvent;
    }

    onComponentDidMount(): void {
       this.getTeams();
    }

    private getTeams(): void {
        this.store.transport
            .getTeams(this.store.orgId, this.store.eventId)
            .then(this.store.onSuccessGetTeams)
            .catch(this.store.onError)
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        if (this.store.teamName == "") {
            this.store.isError = true;
            this.store.message = "Введите название команды";
            return;
        }
        this.store.transport
            .addTeam(this.store.teamName, this.store.orgId, this.store.eventId)
            .then(this.store.onSuccessAddTeam)
            .then(this.getTeams)
            .catch(this.store.onErrorImpl)
    }

    handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.store.teamName = event.target.value;
    }

    deleteTeam(id: number): void {
        this.store.transport
            .removeTeam(id)
            .then(this.getTeams)
            .catch(this.store.onError)
    }

    onDelete(): void {
        this.deleteTeam(this.store.selectedId);
        this.store.closePopup();
    }
}