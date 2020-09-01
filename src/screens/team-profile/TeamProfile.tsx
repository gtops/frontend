import React from "react";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import {TeamProfileStore} from "./TeamProfileStore";
import {TeamProfileController} from "./TeamProfileController";
import {ITeamProfileProps} from "./ITeamProfileProps";
import {ITableColumn, Table} from "../../components/table";
import {AsideWrapper} from "../../components/aside-wrapper";
import {UserForm} from "../../components/user-form/UserForm";
import {ERoles, UserStore} from "../../components/user-store";
import {EFormTypes} from "../../EFormTypes";
import {isEmpty} from "lodash";
import classNames from "classnames";
import {ConfirmPopup} from "../../components/confirm-popup";
import {EPath} from "../../EPath";
import {getEventLink} from "../../services/utils";

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
            <div className={"container team-profile"}>
                <a className={"back-link"}
                   href={getEventLink(this.store.orgId, this.store.eventId)}>Вернуться
                    на страницу мероприятия</a>
                {
                    this.store.isChangingName
                        ?
                        <div>
                            <input onChange={this.controller.setNewName} className={"input__field -name"}
                                   value={this.store.newName}/>
                            <div className={"button -small"} onClick={this.controller.changeTeamName}>Сохранить</div>
                            <div className={"button -small"} onClick={this.controller.cancelNameChanging}>Отменить</div>
                        </div>
                        : <h1
                            onClick={this.controller.editName}
                            className={classNames({"event-name": true, "-editable": this.store.canEdit()})}>
                            {this.store.name}
                        </h1>

                }
                {
                    this.store.canEdit()
                        ? <div>
                            <div className={"button-container"}>
                                <div className={"add-button -closed"} onClick={this.controller.showUserForm}>
                                    Добавить участника
                                </div>
                                {
                                    UserStore.getInstance().role == ERoles.LOCAL_ADMIN || UserStore.getInstance().role == ERoles.SECRETARY
                                        ? (
                                            <div className={"add-button -closed"} onClick={this.controller.showCoachForm}>
                                                Добавить тренера
                                            </div>
                                        )
                                        : void 0
                                }
                            </div>
                            <AsideWrapper
                                title={this.store.getWrapperTitle()}
                                isVisible={this.store.isVisible}
                                component={
                                    <UserForm
                                        formType={this.store.formType}
                                        successMessage={this.store.getSuccessMessage()}
                                        id={this.store.teamId}
                                        onSuccess={this.controller.onSuccessAdd}
                                        isEditForm={this.store.isEditForm}
                                        data={this.store.data}
                                    />
                                }
                                onClose={this.controller.closeForm}
                            />
                        </div>
                        : void 0
                }
                <h2>Тренеры</h2>
                {
                    isEmpty(this.store.coaches)
                        ? <p>У команды пока нет тренеров.</p>
                        : <Table columns={
                            this.store.canEdit() &&
                            (UserStore.getInstance().role == ERoles.LOCAL_ADMIN || UserStore.getInstance().role == ERoles.SECRETARY)
                                ? [
                                    {accessor: "name", title: "Имя", className: "name"},
                                    {accessor: "email", title: "Почта"},
                                    {accessor: "", title: "", cell: this.setDeleteCoachCell},
                                ]
                                : [
                                    {accessor: "name", title: "Имя", className: "name"},
                                    {accessor: "email", title: "Почта"},
                                ]} data={this.store.coaches}/>
                }

                <h2>Участники</h2>
                {
                    isEmpty(this.store.participants)
                        ? <p>В команде пока нет участников.</p>
                        : <div>
                            <Table columns={this.getColumns()} data={this.store.participants}/>
                            {
                                this.store.canEdit() &&
                                (UserStore.getInstance().role == ERoles.LOCAL_ADMIN || UserStore.getInstance().role == ERoles.SECRETARY)
                                    ? <div className={"button"} onClick={this.controller.acceptAllTeam}>
                                        Подтвердить всех
                                    </div>
                                    : void 0
                            }
                        </div>
                }
                <ConfirmPopup
                    isVisible={this.store.isConfirmPopupVisible}
                    onSubmit={this.controller.onDelete}
                    onCancel={this.controller.closePopup}
                    popupText={this.store.popupText}
                />
            </div>
        )
    }

    private getColumns(): ITableColumn[] {
        if (this.store.canEdit()) {
            if (UserStore.getInstance().role == ERoles.SECRETARY || UserStore.getInstance().role == ERoles.LOCAL_ADMIN) {
                return ([
                    {accessor: "_userId", title: "ID участника", className: "name", cell: this.setIdCell},
                    {accessor: "name", title: "Имя", className: "name"},
                    {accessor: "email", title: "Почта"},
                    {accessor: "dateOfBirth", title: "Дата рождения"},
                    {accessor: "status", title: "Статус"},
                    {accessor: "", title: "Подтвердить", cell: this.setParticipantAcceptCell},
                    {accessor: "delete", title: "", cell: this.setParticipantCell, className: "delete"}
                ])
            } else if (UserStore.getInstance().role == ERoles.COACH) {
                return ([
                    {accessor: "_userId", title: "ID участника", className: "name", cell: this.setIdCell},
                    {accessor: "_name", title: "Имя", cell: this.setNameCell},
                    {accessor: "email", title: "Почта"},
                    {accessor: "dateOfBirth", title: "Дата рождения"},
                    {accessor: "status", title: "Статус"},
                    {accessor: "delete", title: "", cell: this.setDeleteParticipantCell, className: "delete"},
                ])
            }
        }
        return [
            {accessor: "_userId", title: "ID участника", className: "name", cell: this.setIdCell},
            {accessor: "name", title: "Имя", className: "name"},
            {accessor: "email", title: "Почта"},
            {accessor: "status", title: "Статус"},
        ]
    }

    private setDeleteParticipantCell(data: any): React.ReactNode {
        if (data.data.isConfirmed) {
            return <span>удаление недоступно</span>
        }
        return <span onClick={() => this.controller.showPopup(data.data.EventParticipantId, "participant")}
                     className={"delete-icon"}/>
    }

    private setIdCell(data: any): React.ReactNode {
        return (
            <a href={EPath.USER_RESULT.replace(":eventId", data.data.eventId).replace(":userId", data.data.userId)}>
                {data.data.userId}
            </a>
        )
    }

    private setDeleteCoachCell(data: any): React.ReactNode {
        return <span onClick={() => this.controller.showPopup(data.data.teamLeadId, "coach")}
                     className={"delete-icon"}/>
    }

    private setParticipantCell(data: any): React.ReactNode {
        return <span onClick={() => this.controller.showPopup(data.data.EventParticipantId, "participant")}
                     className={"delete-icon"}/>
    }

    private setNameCell(data: any): React.ReactNode {
        return (
            <span
                onClick={() => this.controller.showForm(data.data)}
                className={"event-name -editable"}
            >
                {data.data.name}
            </span>
        )
    }

    private setParticipantAcceptCell(data: any): React.ReactNode {
        if (!data.data) return;
        if (data.data.isConfirmed) return <span>Подтвержден</span>;
        return <span onClick={() => this.controller.acceptParticipant(data.data.EventParticipantId)}
                     style={{cursor: "pointer"}}>Подтвердить</span>
    }
}