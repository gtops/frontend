import * as React from "react";
import {Table} from "../../../../../../components/table";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import {SportObjectCatalogStore} from "./SportObjectCatalogStore";
import {SportObjectCatalogController} from "./SportObjectCatalogController";
import {ObjectForm} from "../object-form/ObjectForm";
import {ConfirmPopup} from "../../../../../../components/confirm-popup";

@autobind
@observer
export class SportObjectCatalog extends React.Component {
    private readonly store = new SportObjectCatalogStore();
    private readonly controller = new SportObjectCatalogController(this.store);

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
                        ? <ObjectForm onSuccess={this.controller.getObjects}/>
                        : void 0
                }
                <Table columns={[
                    {accessor: "name", title: "Название", className: "name"},
                    {accessor: "address", title: "Адрес"},
                    {accessor: "description", title: "описание"},
                    {accessor: "delete", title: "", cell: this.setCell},
                ]} data={this.store.secretaries}/>
                <ConfirmPopup
                    isVisible={this.store.isConfirmPopupVisible}
                    onSubmit={this.controller.onDelete}
                    onCancel={this.store.closePopup}
                    popupText={"Вы действительно хотите удалить объект из каталога?"}
                />
            </div>
        )
    }

    private setCell(data: any): React.ReactNode {
        return <span onClick={() => this.store.showPopup(data.data.sportObjectId)} className={"delete-icon"}/>
    }
}