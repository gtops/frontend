import React from "react";
import {Tabs} from "../../../../components/tabs";
import {EventsList} from "../events-list";
import {EventForm} from "../event-form";

export class Events extends React.Component {
    render(): React.ReactNode {
        return (
            <Tabs
                tabs={[
                    {name: "Мои мероприятия", component: <EventsList/>, isActive: true},
                    {name: "Добавить мероприятие", component: <EventForm/>},
                ]}
                classNameHeading = "-links"
            />
        )
    }
}