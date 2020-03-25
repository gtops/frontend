import React from "react";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import {TeamProfileStore} from "./TeamProfileStore";
import {TeamProfileController} from "./TeamProfileController";
import {ITeamProfileProps} from "./ITeamProfileProps";
import {Table} from "../../components/table";

@autobind
@observer
export class TeamProfile extends React.Component<ITeamProfileProps> {
    private readonly store = new TeamProfileStore();
    private readonly controller = new TeamProfileController(this.store);

    componentWillMount(): void {
        this.controller.onComponentWillMount(this.props);
    }

    componentDidMount(): void {
        this.controller.onComponentDidMount();
    }

    render(): React.ReactNode {
        return (
            <div className={"container"}>
                <h2>Тренеры</h2>
                <Table columns={
                    [
                        {accessor: "name", title: "Имя", className: "name"},
                        {accessor: "email", title: "Почта"},
                    ]} data={this.store.coaches}/>
                <h2>Участники</h2>
                <Table columns={
                    [
                        {accessor: "name", title: "Имя", className: "name"},
                        {accessor: "email", title: "Почта"},
                    ]} data={this.store.participants}/>
            </div>
        )
    }
}