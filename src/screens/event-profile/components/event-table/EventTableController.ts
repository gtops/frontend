import {EventTableStore} from "./EventTableStore";
import {autobind} from "core-decorators";
import {OptionValue} from "react-selectize";
import {isUndefined} from "lodash";
import {ISecretaryFormProps} from "../secretary-form/ISecretaryFormProps";
import {IEventTableProps} from "./IEventTableProps";

@autobind
export class EventTableController {
    private readonly store: EventTableStore;

    constructor(store: EventTableStore) {
        this.store = store;
    }

    onComponentDidMount(props: IEventTableProps): void {
        this.store.eventId = props.eventId;
        this.getTables();
        this.getCurrentTable();
    }

    getCurrentTable(): void {
        this.store.transport
            .getCurrentTable(this.store.eventId)
            .then(this.store.onSuccessGetCurrentTable)
    }

    private getTables(): void {
        this.store.transport.getTables().then(this.store.onSuccessGetTables).catch(this.store.onError)
    }

    onChangeTable(value: OptionValue): void {
        this.store.selectedTable = value;
    }

    addTable(): void {
        if (isUndefined(this.store.selectedTable)) {
            this.store.isError = true;
            this.store.message = 'Выберете таблицу перевода';
            return
        }
        this.store.transport
            .addTable(this.store.eventId, this.store.selectedTable.value)
            .then(this.store.onSuccessAddTable)
            .then(this.getCurrentTable)
            .catch(this.store.onError)
    }
}