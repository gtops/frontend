import React from "react";
import {Tabs} from "../../../../components/tabs";
import {Events} from "../events";
import {Catalogs} from "../catalogs";

export class LocalAdminProfile extends React.Component {
    render() {
        return (
            <Tabs
                tabs={[
                    {name: "Мероприятия", component: <Events/>, isActive: true},
                    {name: "Справочники", component: <Catalogs/>, isActive: false}
                ]}
                isMain={true}
            />
        )
    }
}