import React from "react";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import {TeamProfileStore} from "./TeamProfileStore";
import {TeamProfileController} from "./TeamProfileController";
import {ITeamProfileProps} from "./ITeamProfileProps";
import {Table} from "../../components/table";
import {AsideWrapper} from "../../components/aside-wrapper";
import {UserForm} from "../../components/user-form/UserForm";
import {ERoles} from "../../components/user-store";
import {EFormTypes} from "../../EFormTypes";

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
                    this.store.canEditEvent ?
                        [
                            {accessor: "name", title: "Имя", className: "name"},
                            {accessor: "email", title: "Почта"},
                            {accessor: "status", title: "Статус"},
                            {accessor: "", title: "Подтвердить", cell: this.setParticipantAcceptCell},
                            {accessor: "delete", title: "", cell: this.setParticipantCell},
                        ]
                        : [
                            {accessor: "name", title: "Имя", className: "name"},
                            {accessor: "email", title: "Почта"},
                            {accessor: "status", title: "Статус"},
                        ]} data={this.store.participants}/>
                {
                    this.store.canEditEvent
                        ? <div>
                            <AsideWrapper
                                title={"Добавить участника"}
                                isVisible={this.store.isVisible}
                                component={
                                    <UserForm
                                        formType={EFormTypes.TEAM_USER}
                                        successMessage="Участник успешно добавлен."
                                        id={this.store.teamId}
                                        onSuccess={this.controller.onSuccessAdd}
                                    />
                                }
                                onClose={this.controller.closeForm}
                            />
                            <div className={"button -fixed"} onClick={this.controller.showForm}>
                                Добавить участника
                            </div>
                        </div>
                        : void 0
                }
            </div>
        )
    }

    private setParticipantCell(data: any): React.ReactNode {
        return <span onClick={() => this.controller.deleteParticipant(data.data.EventParticipantId)}
                     className={"delete-icon"}/>
    }

    private setParticipantAcceptCell(data: any): React.ReactNode {
        if (!data.data) return;
        if (data.data.isConfirmed) return <span>Подтвержден</span>;
        return <span onClick={() => this.controller.acceptParticipant(data.data.EventParticipantId)}
                     style={{cursor: "pointer"}}>Подтвердить</span>
    }
}