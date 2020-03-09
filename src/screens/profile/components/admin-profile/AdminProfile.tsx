import React from "react";
import {CommonProfile} from "../common-profile";
import {AdminProfileController} from "./AdminProfileController";
import {AdminProfileStore} from "./AdminProfileStore";
import {Table} from "../../../../components/table";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import Select from "react-select";

@autobind
@observer
export class AdminProfile extends CommonProfile {
    protected readonly store = new AdminProfileStore();
    protected readonly controller = new AdminProfileController(this.store);

    componentDidMount(): void {
        this.controller.onComponentDidMount();
        this.setColumns();
    }

    setColumns(): void {
        this.store.orgColumns = [
            {accessor: "orgName", title: "Название", className: "name"},
            {accessor: "orgAddress", title: "Адрес"},
            {accessor: "orgId", title: "ID"},
            {accessor: "delete", title: "", cell: this.setCell},
        ]
    }

    render() {
        return (
            <div className={"container"}>
                <div className={"profile"}>
                    <h1>Профиль</h1>
                    <section className={"org-list-section"}>
                        <h2>Список организаций</h2>
                        <Table columns={this.store.orgColumns} data={this.store.orgData}/>
                    </section>
                    <section className={"event-list-section"}>
                        <h2>Список мероприятий</h2>
                        <Table columns={this.store.eventColumns} data={this.store.eventData}/>
                    </section>
                    <section className={"invite-section"}>
                        <h2>Редактировать организацию</h2>
                        <form onSubmit={this.controller.onSubmit}>
                            <Select
                                isSearchable={true}
                                options={
                                    this.store.orgsList.map(item => {
                                        return {
                                            value: item.id, label: item.name
                                        }
                                    })
                                }
                                className="react-select-container"
                                classNamePrefix="react-select"
                                placeholder={"Выберите организацию"}
                                onChange={this.controller.onChange}
                            />
                            <label>
                                Название:
                                <input name="name" onChange={this.controller.handleEditInputChange}
                                       value={this.store.editFormValues.name}/>
                            </label><br/>
                            <label>
                                Адрес:
                                <input name="address" onChange={this.controller.handleInputChange}
                                       value={this.store.editFormValues.address}/>
                            </label><br/>
                            <label>
                                Ответственное лицо:
                                <input name="leader" onChange={this.controller.handleInputChange}
                                       value={this.store.editFormValues.leader}/>
                            </label><br/>
                            <label>
                                Номер телефона:
                                <input name="phoneNumber" onChange={this.controller.handleInputChange}
                                       value={this.store.editFormValues.phoneNumber}/>
                            </label><br/>
                            <label>
                                oqrn:
                                <input name="oqrn" onChange={this.controller.handleInputChange}
                                       value={this.store.editFormValues.oqrn}/>
                            </label><br/>
                            <label>
                                paymentAccount:
                                <input name="paymentAccount" onChange={this.controller.handleInputChange}
                                       value={this.store.editFormValues.paymentAccount}/>
                            </label><br/>
                            <label>
                                branch:
                                <input name="branch" onChange={this.controller.handleInputChange}
                                       value={this.store.editFormValues.branch}/>
                            </label><br/>
                            <label>
                                bik:
                                <input name="bik" onChange={this.controller.handleInputChange}
                                       value={this.store.editFormValues.bik}/>
                            </label><br/>
                            <label>
                                correspondentAccount:
                                <input name="correspondentAccount" onChange={this.controller.handleInputChange}
                                       value={this.store.editFormValues.correspondentAccount}/>
                            </label><br/>
                            <input type={"submit"} value="Сохранить"/>
                            {
                                this.store.isSuccessPopupVisible
                                    ? <div>Данные изменены</div>
                                    : void 0
                            }
                        </form>
                    </section>

                    <section className={"invite-org-section"}>
                        <h2>Добавить организацию</h2>
                        <form onSubmit={this.controller.handleSubmit}>
                            <label>
                                Название:
                                <input name="name" onChange={this.controller.handleInputChange}
                                       value={this.store.addFormValues.name}/>
                            </label><br/>
                            <label>
                                Адрес:
                                <input name="address" onChange={this.controller.handleInputChange}
                                       value={this.store.addFormValues.address}/>
                            </label><br/>
                            <label>
                                Ответственное лицо:
                                <input name="leader" onChange={this.controller.handleInputChange}
                                       value={this.store.addFormValues.leader}/>
                            </label><br/>
                            <label>
                                Номер телефона:
                                <input name="phoneNumber" onChange={this.controller.handleInputChange}
                                       value={this.store.addFormValues.phoneNumber}/>
                            </label><br/>
                            <label>
                                oqrn:
                                <input name="oqrn" onChange={this.controller.handleInputChange}
                                       value={this.store.addFormValues.oqrn}/>
                            </label><br/>
                            <label>
                                paymentAccount:
                                <input name="paymentAccount" onChange={this.controller.handleInputChange}
                                       value={this.store.addFormValues.paymentAccount}/>
                            </label><br/>
                            <label>
                                branch:
                                <input name="branch" onChange={this.controller.handleInputChange}
                                       value={this.store.addFormValues.branch}/>
                            </label><br/>
                            <label>
                                bik:
                                <input name="bik" onChange={this.controller.handleInputChange}
                                       value={this.store.addFormValues.bik}/>
                            </label><br/>
                            <label>
                                correspondentAccount:
                                <input name="correspondentAccount" onChange={this.controller.handleInputChange}
                                       value={this.store.addFormValues.correspondentAccount}/>
                            </label>
                            <input type={"submit"} value="Добавить"/>
                        </form>
                    </section>
                </div>
            </div>
        )
    }

    //TODO.. fix type
    private setCell(data: any): React.ReactNode {
        return <span onClick={() => this.controller.deleteOrg(data.data.orgId)} style={{transform: "rotate(90deg)", cursor: "pointer"}}>X</span>
    }
}