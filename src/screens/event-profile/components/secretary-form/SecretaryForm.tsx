import * as React from "react";
import {autobind} from "core-decorators";
import {EGender} from "../../../calculator/EGender";
import {Radio} from "../../../../components/radio-button";
import {SecretaryFormStore} from "./SecretaryFormStore";
import {SecretaryFormController} from "./SecretaryFormController";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import {observer} from "mobx-react";
import {ISecretaryFormProps} from "./ISecretaryFormProps";
import {Popup} from "../../../../components/popup/Popup";
import ru from "date-fns/locale/ru";

@autobind
@observer
export class SecretaryForm extends React.Component<ISecretaryFormProps> {
    private readonly store = new SecretaryFormStore();
    private readonly controller = new SecretaryFormController(this.store);

    componentDidMount(): void {
        this.controller.onComponentDidMount(this.props);
    }

    render(): React.ReactNode {
        let date = this.store.formValues.dateOfBirth == "" ? new Date() : new Date(this.store.formValues.dateOfBirth);

        return (
            <div>
                <form className={"form -shadowed"} onSubmit={this.controller.handleSubmit}>
                    <div className={"form__toggle"}>
                        <label className={this.store.isAddChecked ? "toggle-item -active" : "toggle-item"}>
                            Новый пользователь
                            <input type={"radio"} checked={this.store.isAddChecked}
                                   onChange={this.controller.onChangeRadio}/>
                        </label>
                        <label className={!this.store.isAddChecked ? "toggle-item -active" : "toggle-item"}>
                            Зарегестрированный пользователь
                            <input type={"radio"} checked={!this.store.isAddChecked}
                                   onChange={this.controller.onChangeRadio}/>
                        </label>
                    </div>
                    {
                        this.store.isAddChecked
                            ?
                            <div className={"label__container"}>
                                <label className={"form__field"}>
                                    ФИО
                                    <input name="name" onChange={this.controller.handleInputChange}
                                           value={this.store.formValues.name}/>
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
                                    <div className={"gender form__field"}>
                                        <span>Пол </span>
                                        <Radio values={[EGender.MALE, EGender.FEMALE]}
                                               onChange={this.controller.onChangeGender}/>
                                    </div>
                                </div>
                                <label className={"form__field"}>
                                    Почта
                                    <input name="email" type={"email"}
                                           onChange={this.controller.handleInputChange}
                                           value={this.store.formValues.email}/>
                                </label>
                            </div>
                            : <label className={"form__field"}>
                                E-mail
                                <input name="email" type={"email"}
                                       onChange={this.controller.handleInputEmailChange}
                                       value={this.store.email}/>
                            </label>
                    }
                    <input className={"form__button"} type={"submit"} value={"Сохранить"}/>
                </form>
                <Popup
                    popupText={this.store.message}
                    isVisible={this.store.message !== ""}
                    isError={this.store.isError}
                    onClose={this.controller.onPopupClose}
                />
            </div>
        )
    }
}