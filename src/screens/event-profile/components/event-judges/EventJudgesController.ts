import {autobind} from "core-decorators";
import {EventJudgesStore} from "./EventJudgesStore";
import {IEventJudgesProps} from "./IEventJudgesProps";
import * as React from "react";
import {isUndefined} from "lodash";
import {OptionValue} from "react-selectize";

@autobind
export class EventJudgesController {
    private readonly store: EventJudgesStore;

    constructor(store: EventJudgesStore) {
        this.store = store;
    }

    onComponentWillMount(props: IEventJudgesProps): void {
        this.store.eventId = props.eventId;
        this.store.orgId = props.orgId;
    }

    onComponentDidMount(): void {
        this.getJudgesCatalog();
        this.getEventTrials();
    }

    getEventTrials(): void {
        this.store.transport
            .getEventAddedTrials(this.store.eventId)
            .then(this.store.onSuccessGetTrials)
            .catch(this.store.onError)
    }

    onChangeTrial(value: OptionValue): void {
        this.store.selectedTrial = value;
    }

    getJudgesCatalog(): void {
        this.store.transport.getJudges(this.store.orgId).then(this.store.onSuccessGetJudgesCatalog)
    }

    handleSubmitJudgesForm(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        if (isUndefined(this.store.selectedJudge) || isUndefined(this.store.selectedTrial)) {
            this.store.isError = true;
            this.store.message = "Выберите судью и соревнование";
            return;
        }
        this.store.transport
            .addJudgeInTrial(this.store.selectedTrial.value, this.store.selectedJudge.value)
            .then(this.store.onSuccessAddJudgeInEvent)
            .catch(this.store.onError)
    }

    onValueJudgeChange(value: OptionValue): void {
        this.store.selectedJudge = value;
    }
}