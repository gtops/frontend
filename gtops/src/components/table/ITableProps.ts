import {ITableColumn} from "./ITableColumn";

export interface ITableProps {
    columns?: ITableColumn[];
    data?: object[];
}