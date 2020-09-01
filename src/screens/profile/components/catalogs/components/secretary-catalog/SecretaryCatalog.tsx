import * as React from "react";
import {Table} from "../../../../../../components/table/index";
import {UserStore} from "../../../../../../components/user-store/index";
import {SecretaryForm} from "../../../../../event-profile/components/secretary-form/index";
import {SecretaryCatalogStore} from "./SecretaryCatalogStore";
import {CatalogsController} from "./SecretaryCatalogController";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import {ConfirmPopup} from "../../../../../../components/confirm-popup";

@autobind
@observer
export class SecretaryCatalog extends React.Component {
    private readonly store = new SecretaryCatalogStore();
    private readonly controller = new CatalogsController(this.store);

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
                    this.store.isFormVisible ?
                        <SecretaryForm
                            orgId={UserStore.getInstance().organizationId}
                            onSuccess={this.controller.getSecretaries}
                        /> : void 0
                }

                <Table columns={[
                    {accessor: "name", title: "ФИО", className: "name"},
                    {accessor: "dateOfBirth", title: "Дата рождения"},
                    {accessor: "email", title: "Почта"},
                    {accessor: "delete", title: "", cell: this.setCell},
                ]} data={this.store.secretaries}/>
                <ConfirmPopup
                    isVisible={this.store.isConfirmPopupVisible}
                    onSubmit={this.controller.onDelete}
                    onCancel={this.store.closePopup}
                    popupText={"Вы действительно хотите удалить секретаря из каталога?"}
                />
            </div>
        )
    }

    private setCell(data: any): React.ReactNode {
        return <span onClick={() => this.store.showPopup(data.data.secretaryOnOrganizationId)}
                     className={"delete-icon"}/>
    }
}