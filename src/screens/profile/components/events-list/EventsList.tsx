import React from "react";
import {Table} from "../../../../components/table/index";
import {autobind} from "core-decorators";
import {EventsListStore} from "./EventsListStore";
import {EventsListController} from "./EventsListController";
import {observer} from "mobx-react";

@autobind
@observer
export class EventsList extends React.Component {
    private readonly store = new EventsListStore();
    private readonly controller = new EventsListController(this.store);

    componentDidMount(): void {
        this.controller.onComponentDidMount();
    }
    render(): React.ReactNode {
        return (
            <section className={"event-list-section"}>
                <Table
                    columns={[
                        {accessor: "eventName", title: "Название", className: "name"},
                        {accessor: "eventStartDate", title: "Дата начала"},
                        {accessor: "desc", title: "Описание"},
                    ]}
                    data={this.store.eventsList}/>
            </section>
        )
    }
}