import {IResultData, UserResultStore} from "./UserResultStore";
import {autobind} from "core-decorators";
import * as React from "react";
import {EResultTypes} from "./EResultTypes";
import {
    getFormattedResultCount, getFormattedResultTime, validateInputCount,
    validateInputTime
} from "../../services/utils";
import {IUserResultProps} from "./IUserResultProps";
import {isUndefined} from "lodash";

@autobind
export class UserResultController {
    private readonly store: UserResultStore;

    constructor(store: UserResultStore) {
        this.store = store;
    }

    onChangeInput(event: React.ChangeEvent<HTMLInputElement>): void {
        this.store.data.map(item => {
            if (!item.data) return;
            const itemData = item.data as IResultData;

            if (itemData.resultTrialOnEventId !== +event.target.accessKey) return;
            switch (itemData.resultType) {
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
            const itemData = item.data as IResultData;
            if (!itemData) return;
            if (itemData.resultTrialOnEventId !== +event.target.accessKey) return;

            if (itemData.firstResult === "") return;

            let result = itemData.resultType === EResultTypes.TIME
                ? getFormattedResultTime(event.target.value)
                : getFormattedResultCount(event.target.value);
            this.store.transport
                .updateUserTrialResult(itemData.resultTrialOnEventId, result)
                .then(this.getUserResult)
            // itemData.secondResult = Math.floor(Math.random() * Math.floor(100));
        });
    }

    onComponentWillMount(props: IUserResultProps): void {
        if (isUndefined(props.match)) return;

        this.store.userId = props.match.params.userId || -1;
        this.store.eventId = props.match.params.eventId || -1;
    }

    onComponentDidMount(): void {
        this.getUserResult();
    }

    private getUserResult(): void {
        this.store.transport
            .getUserResult(this.store.userId, this.store.eventId)
            .then(this.store.onSuccessGetUserResult)
            .catch(this.store.onError)
    }
}