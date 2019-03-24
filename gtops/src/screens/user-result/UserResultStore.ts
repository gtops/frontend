import {observable} from "mobx";
import {ICompetitionResult} from "../../services/Transport/responses/ICompetitionResult";
import {autobind} from "core-decorators";
import {ITableColumn} from "../../components/table";

@autobind
export class UserResultStore {
    @observable data: ICompetitionResult[] = [];
    columns: ITableColumn[] =  [
        {accessor: "date_of_competition", title: "Дата"},
        {accessor: "name_of_trial", title: "Соревнование"},
        {accessor: "primary_result", title: "Первичный результат"},
        {accessor: "secondary_result", title: "Приведенный результат"},
        {accessor: "unique_number", title: "уникальный Номер"},
    ];
    @observable error: string = "";
}