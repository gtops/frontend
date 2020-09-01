import React from "react";
import {isEqual} from "lodash";
import {IEventTeamsProps} from "./IEventTeamsProps";
import {Table} from "../../../../components/table";
import {EPath} from "../../../../EPath";
import {EventTeamsStore} from "./EventTeamsStore";
import {EventTeamsController} from "./EventTeamsController";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import classNames from "classnames";
import {ConfirmPopup} from "../../../../components/confirm-popup";
import {AddForm} from "../../../../components/add-form";

@autobind
@observer
export class EventTeams extends React.Component<IEventTeamsProps> {
    private readonly store = new EventTeamsStore();
    private readonly controller = new EventTeamsController(this.store);

    componentWillMount(): void {
        this.controller.onComponentWillMount(this.props);
    }

    componentDidMount(): void {
        this.controller.onComponentDidMount();
    }

    componentDidUpdate(): void {
        if (isEqual(this.store.canEditEvent, this.props.canEditEvent)) return;

        this.store.canEditEvent = this.props.canEditEvent
    }

    render(): React.ReactNode {
        return (
            <div>
                {
                    this.store.canEditEvent
                        ? <AddForm form={this.getForm()} buttonText={"Добавить"}/>
                        : void 0
                }
                <Table
                    columns={
                        this.props.canEditEvent ?
                            [
                                {accessor: "_name", title: "Название", className: "name", cell: this.setTamNameCell},
                                {accessor: "countOfPlayers", title: "Количество участников"},
                                {accessor: "delete", title: "", cell: this.setDeleteCell},
                            ]
                            : [
                                {accessor: "_name", title: "Название", className: "name", cell: this.setTamNameCell},
                                {accessor: "countOfPlayers", title: "Количество участников"},
                            ]}
                    data={this.store.teamsData}
                />
                <ConfirmPopup
                    isVisible={this.store.isConfirmPopupVisible}
                    onSubmit={this.controller.onDelete}
                    onCancel={this.store.closePopup}
                    popupText={"Вы действительно хотите удалить команду?"}
                />
            </div>
        )
    }

    private getForm(): React.ReactNode {
        return (
            <form className={"form -shadowed"} onSubmit={this.controller.handleSubmit}>
                <label className={"form__field"}>
                    Название
                    <input value={this.store.teamName} onChange={this.controller.handleInputChange}/>
                </label>
                {
                    this.store.message === ""
                        ? void 0
                        : <p className={classNames({"message": true, "-type-error": this.store.isError})}>
                            {this.store.message}
                        </p>
                }
                <input className={"form__button"} type={"submit"} value={"Добавить"}/>
            </form>
        )
    }

    private setTamNameCell(data: any): React.ReactNode {
        return <a href={EPath.TEAM_PROFILE.replace(":teamId", data.data.id)}>{data.data.name}</a>
    }

    private setDeleteCell(data: any): React.ReactNode {
        return <span onClick={() => this.store.showPopup(data.data.id)} className={"delete-icon"}/>
    }
}