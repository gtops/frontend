import {autobind} from "core-decorators";
import {isUndefined} from "lodash";
import {ITrialResultProps} from "./ITrialResultProps";
import {TrialResultStore} from "./TrialResultStore";
import {validateInputCount, validateInputTime} from "../../services/utils";
import * as React from "react";
import {EResultTypes} from "../user-result/EResultTypes";
import {IParticipant} from '../../services/transport/responses';

@autobind
export class TrialResultController {
    private readonly store: TrialResultStore;

    constructor(store: TrialResultStore) {
        this.store = store;
    }

    onComponentWillMount(props: ITrialResultProps): void {
        if (isUndefined(props.match)) return;

        this.store.trialInEventId = props.match.params.trialInEventId || -1;
    }

    onComponentDidMount(): void {
        this.getTrialResult();
    }

    findUserById(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        const input = document.getElementById(this.store.userId);
        if (isUndefined(input) || input == null) {
            this.store.findError = true;
            return;
        }

        this.store.findError = false;
        window.scrollTo({
            top: input.getBoundingClientRect().top - 200,
            left: 0,
            behavior: 'smooth'
        });
        input.focus();
        this.store.userId = "";
    }

    onChangeUserId(event: React.ChangeEvent<HTMLInputElement>): void {
        if (isNaN(+event.target.value)) return;

        this.store.userId = event.target.value;
    }

    onBlurUserIdInput(): void {
        this.store.findError = false;
    }

    private getTrialResult(): void {
        this.store.transport
            .getTrialResult(this.store.trialInEventId)
            .then(this.store.onSuccessGetTrialResult)
            .catch(this.store.onError)
    }

    onKeyPress(event: React.KeyboardEvent<HTMLInputElement>): void {
        if(event.key !== 'Enter') return;
        this.store.data.map(item => {
            if (!item.data) return;
            const itemData = item.data as IParticipant;
            // if (itemData.resultOfTrialInEventId.toString() !== event.target.accessKey) return;

            // this.store.transport
            //     .updateUserTrialResult(itemData.resultOfTrialInEventId, event.target.value)
            //     .then(this.getTrialResult)
        })
    }

    onChangeInput(event: React.ChangeEvent<HTMLInputElement>): void {
        this.store.data.map(item => {
            if (!item.data) return;
            const itemData = item.data as IParticipant;
            if (itemData.userId.toString() !== event.target.id) return;
            switch (this.store.type) {
                case EResultTypes.TIME:
                    if (validateInputTime(event.target.value)) {
                        itemData.firstResult = event.target.value.replace(" ", "");
                    }
                    break;
                case EResultTypes.COUNT:
                    if (validateInputCount(event.target.value)) {
                        itemData.firstResult = event.target.value.replace(" ", "");
                    }
                    break;
            }
        })
    }

    onBlur(event: React.FocusEvent<HTMLInputElement>): void {
        this.store.data.map(item => {
            const itemData = item.data as IParticipant;
            if (!itemData) return;
            if (itemData.userId.toString() !== event.target.id) return;

            if (itemData.firstResult === "") return;
            this.store.transport
                .updateUserTrialResult(itemData.resultOfTrialInEventId, event.target.value)
                .then(this.getTrialResult)
        });

    }
}