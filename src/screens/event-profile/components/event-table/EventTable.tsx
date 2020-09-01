import React from "react";
import {SimpleSelect} from "react-selectize";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import {EventTableStore} from "./EventTableStore";
import {EventTableController} from "./EventTableController";
import {IEventTableProps} from "./IEventTableProps";
import classNames from "classnames";
import {isEmpty} from "lodash";

@autobind
@observer
export class EventTable extends React.Component<IEventTableProps> {
    private readonly store = new EventTableStore();
    private readonly controller = new EventTableController(this.store);

    componentWillMount(): void {
        this.controller.onComponentDidMount(this.props);
    }

    render(): React.ReactNode {
        let table = isEmpty(this.store.tableName) ? "не выбрана" : this.store.tableName;
        return (
            <div>
                <div>
                    <p>Текущая таблица: {table}</p>
                    {
                        this.store.message === ""
                            ? void 0
                            : <p className={classNames({"message": true, "-type-error": this.store.isError})}>
                                {this.store.message}
                            </p>
                    }
                    {
                        this.props.canEdit
                            ? <div>
                                <SimpleSelect
                                    value={this.store.selectedTable}
                                    onValueChange={this.controller.onChangeTable}
                                    options={this.store.tables}
                                    placeholder={"Выберите таблицу перевода"}
                                />
                                <div className={"button"} onClick={this.controller.addTable}>
                                    Сохранить
                                </div>
                            </div>
                            : void 0
                    }
                </div>
            </div>
        )
    }
}