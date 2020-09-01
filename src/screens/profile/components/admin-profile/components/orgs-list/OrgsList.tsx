import React from "react";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import {OrgsListController} from "./OrgsListController";
import {OrgsListStore} from "./OrgsListStore";
import {Table} from "../../../../../../components/table";
import {EPath} from "../../../../../../EPath";
import {ConfirmPopup} from "../../../../../../components/confirm-popup";

@autobind
@observer
export class OrgsList extends React.Component {
    protected readonly store = new OrgsListStore();
    protected readonly controller = new OrgsListController(this.store);

    componentDidMount(): void {
        this.controller.onComponentDidMount();
        this.setColumns();
    }

    setColumns(): void {
        this.store.orgColumns = [
            {accessor: "_orgName", title: "Название", className: "name", cell: this.setNameCell},
            {accessor: "orgAddress", title: "Адрес"},
            {accessor: "orgId", title: "ID"},
            {accessor: "countOfAllEvents", title: "Количество мероприятий"},
            {accessor: "delete", title: "", cell: this.setCell},
        ]
    }

    render(): React.ReactNode {
        return (
            <section className={"org-list-section"}>
                <Table columns={this.store.orgColumns} data={this.store.orgData}/>
                <ConfirmPopup
                    isVisible={this.store.isConfirmPopupVisible}
                    onSubmit={this.controller.onDelete}
                    onCancel={this.store.closePopup}
                    popupText={"Вы действительно хотите удалить организацию?"}
                />
            </section>
        )
    }

    //TODO.. fix type
    private setCell(data: any): React.ReactNode {
        return <span onClick={() => this.store.showPopup(data.data.orgId)} className={"delete-icon"}/>
    }

    private setNameCell(data: any): React.ReactNode {
        return <a href={EPath.ORGANISATION_PROFILE.replace(":id", data.data.orgId)}>{data.data.orgName}</a>
    }
}