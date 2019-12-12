import React from "react";
import {InputField} from "../../../../components/input-field";
import {CommonProfile} from "../common-profile";
import Select from "react-select";
import {AdminProfileController} from "./AdminProfileController";
import {AdminProfileStore} from "./AdminProfileStore";
import {Table} from "../../../../components/table";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";

@autobind
@observer
export class AdminProfile extends CommonProfile {
    protected readonly store = new AdminProfileStore();
    protected readonly controller = new AdminProfileController(this.store);

    componentDidMount(): void {
        this.controller.onComponentDidMount();
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
                        <h2>Пригласить пользователя</h2>
                        <p>Введите почту для отправки приглашения</p>
                        <InputField setValue={this.controller.setValue}/>
                        <Select
                            isSearchable={true}
                            options={
                                this.store.roles.map(item => {
                                    return {
                                        value: item.role_id, label: item.name_of_role
                                    }
                                })
                            }
                            className="react-select-container"
                            classNamePrefix="react-select"
                            placeholder={"Выберете роль"}
                            onChange={this.controller.onChange}
                        />
                        <button type={"submit"} onClick={this.controller.onSubmit}>send</button>
                        {
                            this.store.isSuccessPopupVisible
                                ? <div>Приглашение успешно отправлено</div>
                                : void 0
                        }
                    </section>
                </div>
            </div>
        )
    }
}