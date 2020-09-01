import React from "react";
import {UserStore} from "../../../../../../components/user-store";
import {EFormTypes} from "../../../../../../EFormTypes";
import {UserForm} from "../../../../../../components/user-form/UserForm";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import {JudgeCatalogStore} from "./JudgeCatalogStore";
import {JudgeCatalogController} from "./JudgeCatalogController";
import {Table} from "../../../../../../components/table";
import {ConfirmPopup} from "../../../../../../components/confirm-popup";

@autobind
@observer
export class JudgeCatalog extends React.Component {
    private readonly store = new JudgeCatalogStore();
    private readonly controller = new JudgeCatalogController(this.store);

    componentDidMount(): void {
        this.controller.onComponentDidMount();
    }

    render(): React.ReactNode {
        return (
            <div>
                <div
                    onClick={this.controller.toggleFormVisibility}
                    className={this.store.isFormVisible ? "add-button -opened" : "add-button -closed"}
                >
                    {this.store.isFormVisible ? "Скрыть" : "Добавить"}
                </div>
                {
                    this.store.isFormVisible
                        ? <UserForm
                            className={"-shadowed"}
                            id={UserStore.getInstance().organizationId}
                            formType={EFormTypes.JUDGE}
                            successMessage={"Судья успешно добавлен"}
                            onSuccess={this.controller.getJudges}
                        />
                        : void 0
                }
                <Table columns={[
                    {accessor: "name", title: "ФИО", className: "name"},
                    {accessor: "email", title: "Почта"},
                    {accessor: "dateOfBirth", title: "Дата рождения"},
                    {accessor: "delete", title: "", cell: this.setCell},
                ]} data={this.store.data}/>
                <ConfirmPopup
                    isVisible={this.store.isConfirmPopupVisible}
                    onSubmit={this.controller.onDelete}
                    onCancel={this.store.closePopup}
                    popupText={"Вы действительно хотите удалить судью из каталога?"}
                />
            </div>
        )
    }

    private setCell(data: any): React.ReactNode {
        return <span onClick={() => this.store.showPopup(data.data.refereeOnOrganizationId)}
                     className={"delete-icon"}/>
    }
}