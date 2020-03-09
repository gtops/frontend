import React from "react";
import {Table} from "../../../../../../components/table";

export class Events extends React.Component {
    render(): React.ReactNode {
        return (
            <section className={"event-list-section"}>
                <h2>Список мероприятий</h2>
                <Table
                    columns={[
                        {accessor: "eventName", title: "Название", className: "name"},
                        {accessor: "eventDate", title: "Дата"},
                        {accessor: "eventСount", title: "Количество участников"},
                    ]}
                    data={[
                        {
                            isVisible: true,
                            data: {eventName: "ГТО", eventDate: new Date().toDateString(), eventCount: "20"}
                        }
                    ]}/>
            </section>
        )
    }
}