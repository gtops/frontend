import React from "react";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import {AllEventsStore} from "./AllEventsStore";
import {AllEventsController} from "./AllEventsController";
import "./AllEvents.scss";
import {Tabs} from "../../components/tabs";
import {Table} from "../../components/table";
import classNames from "classnames";
import {Popup} from "../../components/popup/Popup";

@autobind
@observer
export class AllEvents extends React.Component {
    private readonly store: AllEventsStore = new AllEventsStore();
    private readonly controller: AllEventsController = new AllEventsController(this.store);

    componentDidMount(): void {
        this.controller.onComponentDidMount();
    }

    render(): React.ReactNode {
        return (
            <div className={"container all-events"}>
                {
                    this.store.orgsList.map(item => {
                        return (
                            <div className={classNames({"org-item": true, "-open": item.isVisible})} key={item.data.id}>
                                <div className={"org-item__heading"}
                                     onClick={() => this.controller.onItemClick(item.data.id)}>
                                    {item.data.name}
                                </div>
                                <Table
                                    columns={
                                        [
                                            {accessor: "name", title: "Название", className: "name"},
                                            {accessor: "startDate", title: "Дата начала"},
                                            {accessor: "description", title: "Описание"},
                                            {accessor: "", title: "", cell: this.setCell},
                                        ]
                                    }
                                    data={this.store.events.get(item.data.id)}
                                />
                                <Popup
                                    isVisible={this.store.popupText !== ""}
                                    isError={this.store.isError}
                                    popupText={this.store.popupText}
                                    onClose={this.controller.handleClose}
                                />
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    private setCell(data: any): React.ReactNode {
        return <span style={{cursor: "pointer"}}
                     onClick={() => this.controller.sendRequest(data.data.id)}>Подать заявку</span>
    }
}