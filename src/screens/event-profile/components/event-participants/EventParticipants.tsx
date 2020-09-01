import * as React from "react";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import {EventParticipantsStore} from "./EventParticipantsStore";
import {EventParticipantsController} from "./EventParticipantsController";
import {ERoles, UserStore} from "../../../../components/user-store";
import {Table} from "../../../../components/table";
import {IEventParticipantsProps} from "./IEventParticipantsProps";
import {isEqual} from "lodash";
import {EFormTypes} from "../../../../EFormTypes";
import {AsideWrapper} from "../../../../components/aside-wrapper";
import {UserForm} from "../../../../components/user-form/UserForm";
import {EPath} from "../../../../EPath";
import {ConfirmPopup} from "../../../../components/confirm-popup";

@autobind
@observer
export class EventParticipants extends React.Component<IEventParticipantsProps> {
    private readonly store = new EventParticipantsStore();
    private readonly controller = new EventParticipantsController(this.store);

    componentWillMount(): void {
        this.controller.onComponentWillMount(this.props);
    }

    componentDidMount(): void {
        this.controller.onComponentDidMount();
        this.props.update.subscribe(this.controller.getParticipants);
    }

    componentDidUpdate(): void {
        if (!isEqual(this.store.canEditEvent, this.props.canEditEvent)) {
            this.store.canEditEvent = this.props.canEditEvent
        }

        if (!isEqual(this.store.hasOrgRights, this.props.hasOrgRights)) {
            this.store.hasOrgRights = this.props.hasOrgRights
        }
    }

    render(): React.ReactNode {
        return (
            <div>
                {
                    this.store.canEditEvent && this.store.hasOrgRights ?
                        <div>
                            <div className={"add-button -closed"} onClick={this.controller.showUserForm}>
                                Добавить
                            </div>
                            <AsideWrapper
                                title={"Добавить участника (личный зачет)"}
                                isVisible={this.store.isVisible}
                                component={
                                    <UserForm
                                        successMessage={"Пользователь успешно приглашен"}
                                        formType={EFormTypes.USER}
                                        id={this.store.eventId}
                                        onSuccess={this.controller.onSuccessAddUser}
                                    />
                                }
                                onClose={this.controller.closeWrapper}
                            />
                        </div>
                        : void 0
                }
                <form onSubmit={this.controller.onSubmitSearchForm}>
                    <input value={this.store.searchValue} onChange={this.controller.onChangeSearch}/>
                </form>
                <Table
                    columns={
                        this.props.canEditEvent && this.store.hasOrgRights
                            ? [
                                {accessor: "userId", title: "ID участника"},
                                {accessor: "_name", title: "имя", cell: this.setNameCell},
                                {accessor: "email", title: "почта"},
                                {accessor: "dateOfBirth", title: "Дата рождения"},
                                {accessor: "accept", title: "", cell: this.setParticipantAcceptCell},
                                {accessor: "delete", title: "", cell: this.setParticipantCell, className: "delete"},
                            ]
                            : [
                                {accessor: "userId", title: "ID участника"},
                                {accessor: "_name", title: "имя", className: "name", cell: this.setNameCell},
                                {accessor: "email", title: "почта", className: "name"},
                                {accessor: "dateOfBirth", title: "Дата рождения"},
                                {accessor: "_isConfirmed", title: "статус"},
                            ]
                    }
                    data={this.store.participantData}
                />
                <ConfirmPopup
                    isVisible={this.store.isConfirmPopupVisible}
                    onSubmit={this.controller.onDelete}
                    onCancel={this.store.closePopup}
                    popupText={"Вы действительно хотите удалить участника?"}
                />
            </div>
        )
    }

    private setParticipantAcceptCell(data: any): React.ReactNode {
        if (!data.data) return;
        if (data.data.isConfirmed) return <span>Подтвержден</span>;
        return <span onClick={() => this.controller.acceptParticipant(data.data.EventParticipantId)}
                     style={{cursor: "pointer"}}>Подтвердить</span>
    }

    private setParticipantCell(data: any): React.ReactNode {
        return <span onClick={() => this.store.showPopup(data.data.EventParticipantId)}
                     className={"delete-icon"}/>
    }

    private setNameCell(data: any): React.ReactNode {
        return (
            <a href={
                EPath.USER_RESULT.replace(":eventId", this.store.eventId.toString())
                    .replace(":userId", data.data.userId.toString())}>
                {data.data.name}
            </a>
        )
    }
}