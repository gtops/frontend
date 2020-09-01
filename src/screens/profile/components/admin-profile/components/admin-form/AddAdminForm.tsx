import React from "react";
import {AddAdminFormStore} from "./AddAdminFormStore";
import {AddAdminFormController} from "./AddAdminFormController";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import classNames from "classnames";
import Select from "react-select";
import "./AddAdminForm.scss";
import {EGender} from "../../../../../calculator/EGender";
import {Radio} from "../../../../../../components/radio-button";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import ru from "date-fns/locale/ru";

@autobind
@observer
export class AddAdminForm extends React.Component {
    private readonly store = new AddAdminFormStore();
    private readonly controller = new AddAdminFormController(this.store);

    componentDidMount(): void {
        this.controller.onComponentDidMount();
    }

    render(): React.ReactNode {
        let date = this.store.adminValues.dateOfBirth == "" ? new Date() : new Date(this.store.adminValues.dateOfBirth);

        return (
            <form className={"form"} onSubmit={this.controller.handleSubmit}>
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
                <div className={"form__toggle"}>
                    <label className={this.store.isAddChecked ? "toggle-item -active" : "toggle-item"}>
                        Новый пользователь
                        <input type={"radio"} checked={this.store.isAddChecked} onChange={this.controller.onChangeRadio}/>
                    </label>
                    <label className={!this.store.isAddChecked ? "toggle-item -active" : "toggle-item"}>
                        Зарегестрированный пользователь
                        <input type={"radio"} checked={!this.store.isAddChecked} onChange={this.controller.onChangeRadio}/>
                    </label>
                </div>
                {
                    this.store.isAddChecked
                        ? <div className={"label__container"}>
                            <label className={"form__field"}>
                                ФИО
                                <input name="name" onChange={this.controller.handleInputAdminChange}
                                       value={this.store.adminValues.name}/>
                            </label>
                            <label className={"form__field"}>
                                Почта
                                <input name="email" onChange={this.controller.handleInputAdminChange}
                                       type={"email"} value={this.store.adminValues.email}/>
                            </label>
                            <div className={"form__line"}>
                                <label className={"form__field"}>
                                    Дата рождения
                                    <DatePicker
                                        onChange={this.controller.setDateOfBirth}
                                        selected={date}
                                        locale={ru}
                                        dateFormat="dd.MM.yyyy"
                                    />
                                </label>
                                <div className={"form__field"}>
                                    Пол
                                    <Radio values={[EGender.MALE, EGender.FEMALE]} onChange={this.controller.onRadioChange}/>
                                </div>
                            </div>
                        </div>
                        :
                        <label className={"form__field"}>
                            Почта
                            <input name="email" type={"email"}
                                   onChange={this.controller.handleInputEmailChange}
                                   value={this.store.email}/>
                        </label>
                }

                <input className={"label form__button"} type={"submit"} value="Сохранить"/>
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