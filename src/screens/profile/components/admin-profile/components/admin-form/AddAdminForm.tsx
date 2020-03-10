import React from "react";
import {AddAdminFormStore} from "./AddAdminFormStore";
import {AddAdminFormController} from "./AddAdminFormController";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import classNames from "classnames";
import Select from "react-select";
import "./AddAdminForm.scss";

@autobind
@observer
export class AddAdminForm extends React.Component {
    private readonly store = new AddAdminFormStore();
    private readonly controller = new AddAdminFormController(this.store);

    componentDidMount(): void {
        this.controller.onComponentDidMount();
    }

    render(): React.ReactNode {
        return (
            <form className={"form -type-admin"} onSubmit={this.controller.handleSubmit}>
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
                <div className={"form-toggle"}>
                    <label>
                        Пригласить нового администратора
                        <input type={"radio"} checked={this.store.isAddChecked} onChange={this.controller.onChangeRadio}/>
                    </label>
                    <label>
                        Выбрать существующего администратора
                        <input type={"radio"} checked={!this.store.isAddChecked} onChange={this.controller.onChangeRadio}/>
                    </label>
                </div>
                {
                    this.store.isAddChecked
                        ? <div>
                            <label className={"label"}>
                                Имя:
                                <input name="name" onChange={this.controller.handleInputAdminChange}
                                       value={this.store.adminValues.name}/>
                            </label>
                            <label className={"label"}>
                                Почта:
                                <input name="email" onChange={this.controller.handleInputAdminChange}
                                       value={this.store.adminValues.email}/>
                            </label>
                            <label className={"label"}>
                                Пароль:
                                <input name="password" type={"password"}
                                       onChange={this.controller.handleInputAdminChange}
                                       value={this.store.adminValues.password}/>
                            </label>
                            <br/>
                        </div>
                        :
                        <label className={"label"}>
                            E-mail:
                            <input name="email" type={"email"}
                                   onChange={this.controller.handleInputEmailChange}
                                   value={this.store.email}/>
                        </label>
                }

                <input className={"label"} type={"submit"} value="Сохранить"/>
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
            </form>
        )
    }
}