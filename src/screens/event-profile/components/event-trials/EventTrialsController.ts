import {EventTrialsStore, ITrialsTableData} from "./EventTrialsStore";
import {autobind} from "core-decorators";
import {OptionValue} from "react-selectize";
import {isUndefined} from "lodash";
import {IEventTrialsProps} from "./IEventTrialsProps";
import * as React from "react";
import {getFormattedDateTime} from "../../../../services/utils";

@autobind
export class EventTrialsController {
    private readonly store: EventTrialsStore;

    constructor(store: EventTrialsStore) {
        this.store = store;
    }

    onComponentWillMount(props: IEventTrialsProps): void {
        this.store.eventId = props.eventId;
        this.store.orgId = props.orgId;
        this.store.hasOrgRights = props.hasOrgRights;
        this.store.canEditEvent = props.canEditEvent;
        this.store.startDate = props.startDate;
    }

    onComponentDidMount(): void {
        this.getEventTrials();
        if (!this.store.hasOrgRights || !this.store.canEditEvent) return;

        this.getTrialsFromTable();
        this.getSportObjects();
    }

    getEventTrials(): void {
        this.store.transport
            .getEventAddedTrials(this.store.eventId)
            .then(this.store.onSuccessGetTrials)
            .catch(this.store.onError)
    }

    onDelete(): void {
        this.deleteTrial(this.store.selectedId);
        this.store.closePopup();
    }

    deleteTrial(id: number): void {
        this.store.transport
            .removeEventTrial(id)
            .then(this.getEventTrials)
            .catch(this.store.onError)
    }

    showJudges(trialId: number): void {
        this.store.addedTrials.map(item => {
                if (isUndefined(item.data)) return;
                let data = item.data as ITrialsTableData;
                if (data.trialId !== trialId) return;

                data.isAllJudgesVisible = true;
            }
        )
    }

    deleteJudge(id: number): void {
        this.store.transport
            .removeJudgeFromEvent(id)
            .then(this.getEventTrials)
            .catch(this.store.onError)
    }

    onChangeTrial(value: OptionValue): void {
        this.store.selectedTrial = value;
    }

    onChangeObject(value: OptionValue): void {
        this.store.selectedObject = value;
    }

    setStartDate(date: Date | null, event: React.SyntheticEvent<any> | undefined): void {
        if (date === null) return;
        this.store.startDate = date;
    }

    changeStartDate(date: Date | null, event: React.SyntheticEvent<any> | undefined, id: number): void {
        //transport.editTrialDate
    }


    getSportObjects(): void {
        this.store.transport.getSportObject(this.store.orgId)
            .then(this.store.onSuccessGetSportObjects)
            .catch(this.store.onError)
    }

    getTrialsFromTable(): void {
        this.store.transport
            .getEventTrials(this.store.eventId)
            .then(this.store.onSuccessGetTrialsFromTable)
            .catch(this.store.onError)
    }

    addTrial(): void {
        if (isUndefined(this.store.selectedTrial) || isUndefined(this.store.selectedObject)) {
            this.store.isError = true;
            this.store.message = 'Выберете вид спорта и спортивный объект';
            return
        }

        if (isUndefined(this.store.startDate)) {
            this.store.isError = true;
            this.store.message = 'Выберете дату и время проведения';
            return
        }

        this.store.transport
            .addEventTrial(this.store.eventId,
                {
                    trialId: this.store.selectedTrial.value,
                    sportObjectId: this.store.selectedObject.value,
                    startDateTime: getFormattedDateTime(this.store.startDate)
                })
            .then(this.store.onSuccessAddTrial)
            .then(this.getEventTrials)
            .catch(this.store.onError)
    }
}