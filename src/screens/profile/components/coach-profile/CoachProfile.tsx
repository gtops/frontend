import React from "react";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import {Table} from "../../../../components/table";
import {EPath} from "../../../../EPath";
import {CoachProfileStore} from "./CoachProfileStore";
import {CoachProfileController} from "./CoachProfileController";

@autobind
@observer
export class CoachProfile extends React.Component {
    private readonly store = new CoachProfileStore();
    private readonly controller = new CoachProfileController(this.store);

    componentDidMount(): void {
        this.controller.onComponentDidMount()
    }

    render(): React.ReactNode {
        return (
            <div>
                <h3>Мои команды</h3>
                <Table
                    columns={[
                        {accessor: "id", title: "id", className: "name"},
                        {accessor: "name", title: "Название"},
                        {accessor: "_eventId", title: "Мероприятие", cell: this.setCell},
                    ]}
                    data={this.store.data}/>
            </div>
        )
    }

    private setCell(data: any): React.ReactNode {
        return <a href={EPath.EVENT_PROFILE.replace(":orgId", data.data.organizationId).replace(":eventId", data.data.eventId)}>{data.data.nameOfEvent}</a>
    }
}