import React from "react";
import {IEventSecretaryProps} from "./IEventSecretaryProps";
import {Table} from "../../../../components/table";
import {EPath} from "../../../../EPath";
import {EventSecretaryStore} from "./EventSecretaryStore";
import {EventSecretaryController} from "./EventSecretaryController";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import {SimpleSelect} from "react-selectize";
import classNames from "classnames";
import {ConfirmPopup} from "../../../../components/confirm-popup";
import {AddForm} from "../../../../components/add-form";

@autobind
@observer
export class EventSecretary extends React.Component<IEventSecretaryProps> {
    private readonly store = new EventSecretaryStore();
    private readonly controller = new EventSecretaryController(this.store);

    componentWillMount(): void {
        this.controller.onComponentWillMount(this.props);
    }

    componentDidMount(): void {
        this.controller.onComponentDidMount();
    }

    render(): React.ReactNode {
        return (
            <div>
                {
                    this.props.canEdit
                        ? <AddForm form={this.getForm()} buttonText={"Добавить"}/>
                        : void 0
                }
                <Table
                    columns={
                        this.props.canEdit ? [
                                {accessor: "name", title: "Имя", className: "name"},
                                {accessor: "dateOfBirth", title: "Дата рождения"},
                                {accessor: "email", title: "Почта"},
                                {accessor: "delete", title: "", cell: this.setCell},
                            ]
                            : [
                                {accessor: "name", title: "Имя", className: "name"},
                                {accessor: "dateOfBirth", title: "Дата рождения"},
                                {accessor: "email", title: "Почта"},
                            ]}
                    data={this.store.secretaries}
                />
                <ConfirmPopup
                    isVisible={this.store.isConfirmPopupVisible}
                    onSubmit={this.controller.onDelete}
                    onCancel={this.store.closePopup}
                    popupText={"Вы действительно хотите удалить секретаря?"}
                />
            </div>
        )
    }

    private setCell(data: any): React.ReactNode {
        return <span onClick={() => this.store.showPopup(data.data.secretaryId)} className={"delete-icon"}/>
    }

    private getForm(): React.ReactNode {
        return (
            <form className={"form -shadowed"}
                  onSubmit={this.controller.handleSubmitSecretaryForm}>
                <SimpleSelect
                    options={this.store.secretariesCatalog}
                    value={this.store.selectedSecretary}
                    onValueChange={this.controller.onValueSecretaryChange}
                    placeholder={"Выберите секретаря"}
                />
                {
                    this.store.message === ""
                        ? void 0
                        : <p className={classNames({"message": true, "-type-error": this.store.isError})}>
                            {this.store.message}
                        </p>
                }
                <input type={"submit"} className={"button"} value={"Добавить"}/>
            </form>
        )
    }
}