import * as React from "react";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import {Redirect} from "react-router";
import {OrganisationProfileStore} from "./OrganisationProfileStore";
import {OrganisationProfileController} from "./OrganisationProfileController";
import {IOrganisationProfileProps} from "./IOrganisationProfileProps";
import {Table} from "../../components/table";
import {ConfirmPopup} from "../../components/confirm-popup";

@autobind
@observer
export class OrganisationProfile extends React.Component<IOrganisationProfileProps> {
    private readonly store: OrganisationProfileStore = new OrganisationProfileStore();
    private readonly controller: OrganisationProfileController = new OrganisationProfileController(this.store);

    componentWillMount(): void {
        this.controller.onComponentWillMount(this.props);
    }

    componentDidMount(): void {
        this.controller.onComponentDidMount();
    }

    render(): React.ReactNode {
        return (
            this.store.id == -1
                ? <Redirect to={"/"}/>
                : (
                    <div className={"container event-profile"}>
                        <h1>{this.store.data.name}</h1>
                        <p>Всего мероприятий: {this.store.data.countOfAllEvents}</p>
                        <p>Активных мероприятий: {this.store.data.countOfActiveEvents}</p>
                        <h3>Локальные администраторы</h3>
                        <Table
                            columns={[
                                {accessor: "name", title: "Имя", className: "name"},
                                {accessor: "dateOfBirth", title: "Дата рождения"},
                                {accessor: "email", title: "Почта"},
                                {accessor: "delete", title: "", cell: this.setCell},
                            ]}
                            data={this.store.admins}/>
                        <ConfirmPopup
                            isVisible={this.store.isConfirmPopupVisible}
                            onSubmit={this.controller.onDelete}
                            onCancel={this.store.closePopup}
                            popupText={"Вы действительно хотите удалить администратора орагнизации?"}
                        />
                    </div>
                )
        )
    }

    //TODO.. fix type
    private setCell(data: any): React.ReactNode {
        return <span onClick={() => this.store.showPopup(data.data.localAdminId)} className={"delete-icon"}/>
    }
}