import * as React from "react";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import {EventProfileStore} from "./EventProfileStore";
import {Redirect} from "react-router";
import {EventProfileController} from "./EventProfileController";
import {IEventProfileProps} from "./IEventProfileProps";
import {Table} from "../../components/table";
import {ERoles, UserStore} from "../../components/user-store";
import {AsideWrapper} from "../../components/aside-wrapper";
import {SecretaryForm} from "./components/secretary-form";
import "./EventProfile.scss";
import classNames from "classnames";
import {EPath} from "../../EPath";
import {getDateString} from "../../services/utils";

@autobind
@observer
export class EventProfile extends React.Component<IEventProfileProps> {
    private readonly store: EventProfileStore = new EventProfileStore();
    private readonly controller: EventProfileController = new EventProfileController(this.store);

    componentWillMount(): void {
        this.controller.onComponentWillMount(this.props);
    }

    componentDidMount(): void {
        this.controller.onComponentDidMount();
    }

    render(): React.ReactNode {
        return (
            this.store.eventId == -1 || this.store.orgId == -1
                ? <Redirect to={"/"}/>
                : (
                    <div className={"container event-profile"}>
                        <h1>{this.store.event.name}</h1>
                        <p>Статус: {this.store.event.status}</p>
                        <p>Начало: {getDateString(this.store.event.startDate)}</p>
                        <p>Завершение: {getDateString(this.store.event.expirationDate)}</p>
                        {
                            !this.store.isParticipant && UserStore.getInstance().isLogin()
                                ? <div className={"button"} onClick={this.controller.sendEventRequest}>Подать заявку</div>
                                : void 0
                        }
                        {
                            !UserStore.getInstance().isLogin()
                                ? <p>
                                    <a href={EPath.LOGIN}>Войдите</a> или <a href={EPath.REGISTRATION}>Зарегистрируйтесь</a>,
                                    чтобы подать заявку на участие.
                                </p>
                                : void 0
                        }
                        {
                            UserStore.getInstance().role == ERoles.LOCAL_ADMIN
                                ?
                                <div>
                                    <div className={"button -fixed"} onClick={this.controller.showForm}>Добавить секретаря
                                    </div>
                                    <AsideWrapper
                                        title={"Добавить секретаря"}
                                        isVisible={this.store.isVisible}
                                        component={
                                            <SecretaryForm
                                                onSuccess={this.controller.onSuccessAddSecretary}
                                                onError={this.controller.onErrorAddSecretary}
                                                eventId={this.store.eventId}
                                                orgId={this.store.orgId}
                                            />
                                        }
                                        onClose={this.controller.closeWrapper}
                                    />
                                    <h2>Секретари</h2>
                                    <Table
                                        columns={[
                                            {accessor: "name", title: "Имя", className: "name"},
                                            {accessor: "dateOfBirth", title: "Дата рождения"},
                                            {accessor: "email", title: "Почта"},
                                            {accessor: "delete", title: "", cell: this.setCell},
                                        ]}
                                        data={this.store.secretariesData}/>
                                </div>
                                : void 0
                        }
                        <h2>Список команд</h2>
                        <Table
                            columns={[
                                {accessor: "_name", title: "Название", className: "name", cell: this.setTamNameCell},
                            ]}
                            data={this.store.teamsData}
                        />
                        {
                            UserStore.getInstance().role == ERoles.LOCAL_ADMIN
                            || UserStore.getInstance().role == ERoles.SECRETARY
                                ?
                                <div>
                                    <h2>Добавить команду</h2>
                                    <form className={"form"} onSubmit={this.controller.handleSubmit}>
                                        <label className={"label"}>
                                            Название команды:
                                            <input value={this.store.teamName}
                                                   onChange={this.controller.handleInputChange}/>
                                            <input className={"label form__button"} type={"submit"} value={"Сохранить"}/>
                                        </label>
                                    </form>
                                </div>
                                : void 0
                        }
                        <h2>Список участников (личный зачет)</h2>
                        <Table
                            columns={
                                UserStore.getInstance().role == ERoles.LOCAL_ADMIN
                                || UserStore.getInstance().role == ERoles.SECRETARY
                                    ? [
                                        {accessor: "name", title: "имя", className: "name"},
                                        {accessor: "_isConfirmed", title: "статус"},
                                        {accessor: "accept", title: "", cell: this.setParticipantAcceptCell},
                                        {accessor: "delete", title: "", cell: this.setParticipantCell},
                                    ]
                                    : [
                                        {accessor: "name", title: "имя", className: "name"},
                                        {accessor: "email", title: "почта", className: "name"},
                                        {accessor: "_isConfirmed", title: "статус"},
                                    ]
                            }
                            data={this.store.participantData}
                        />
                        {
                            this.store.isPopupVisible ?
                                <div className={"popup-wrapper"}>
                                    <div className={classNames({
                                        "popup": true,
                                        "-type-error": this.store.isError
                                    })}>
                                        {this.store.popupText}
                                        <div className={"popup__close-icon"} onClick={this.controller.handleCloseClick}/>
                                    </div>
                                </div>
                                : void 0
                        }
                    </div>
                )
        )
    }

    //TODO.. fix type
    private setCell(data: any): React.ReactNode {
        return <span onClick={() => this.controller.deleteSecretary(data.data.secretaryId)}
                     className={"delete-icon"}/>
    }

    private setParticipantCell(data: any): React.ReactNode {
        return <span onClick={() => this.controller.deleteParticipant(data.data.EventParticipantId)}
                     className={"delete-icon"}/>
    }

    private setTamNameCell(data: any): React.ReactNode {
        return <a href={EPath.TEAM_PROFILE.replace(":teamId", data.data.id)}>{data.data.name}</a>
    }

    private setParticipantAcceptCell(data: any): React.ReactNode {
        if (!data.data) return;
        if (data.data.isConfirmed) return <span>Подтвержден</span>;
        return <span onClick={() => this.controller.acceptParticipant(data.data.EventParticipantId)}
                     style={{cursor: "pointer"}}>Подтвердить</span>
    }
}