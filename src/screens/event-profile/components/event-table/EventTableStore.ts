import {Store} from "../../../../components/store";
import {autobind} from "core-decorators";
import {OptionValue} from "react-selectize";
import {observable} from "mobx";
import {IGetCurrentTableResponse, IGetTablesResponse} from "../../../../services/transport/responses";
import {AxiosResponse} from "axios";

@autobind
export class EventTableStore extends Store {
    @observable selectedTable?: OptionValue;
    @observable tables: OptionValue[] = [];
    @observable eventId = -1;
    @observable tableName = "";

    onSuccessGetTables(response: AxiosResponse<IGetTablesResponse[]>): void {
        console.log("[EventTableStore.onSuccessGetTables]: ", response);
        if (!response.data.length) return;

        this.tables = response.data.map(item => {
            return (
                {
                    label: item.name,
                    value: item.tableId
                }
            )
        });
    }

    onSuccessAddTable(response: AxiosResponse): void {
        console.log("[onSuccessAddTable.onSuccessSendEventRequest]: ", response);
        this.isError = false;
        this.message = "Таблица добавлена";
        this.selectedTable = undefined
    }

    onSuccessGetCurrentTable(response: AxiosResponse<IGetCurrentTableResponse>): void {
        console.log("[EventTableStore.onSuccessGetCurrentTable]: ", response);
        this.tableName = response.data.tableName
    }
}