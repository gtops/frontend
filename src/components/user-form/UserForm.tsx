import React from "react";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import {EGender} from "../../screens/calculator/EGender";
import classNames from "classnames";
import {UserFormStore} from "./UserFormStore";
import {IUserFormProps} from "./IUserFormProps";
import {UserFormController} from "./UserFormController";
import {Radio} from "../radio-button";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import {Popup} from "../popup/Popup";
import {isUndefined, isEqual} from "lodash";
import {getFormattedDate} from "../../services/utils";
import ru from "date-fns/locale/ru";

@autobind
@observer
export class UserForm extends React.Component<IUserFormProps> {
    private readonly store = new UserFormStore();
    private readonly controller = new UserFormController(this.store);

    componentDidMount(): void {
        this.store.formType = this.props.formType;
        this.store.successMessage = this.props.successMessage;
        this.store.id = this.props.id;
        this.store.onSuccessImpl = this.props.onSuccess;
        this.store.isEditForm = this.props.isEditForm || false;
        if (isUndefined(this.props.data)) return;

        this.store.formValues = {
            name: this.props.data.name,
            email: this.props.data.email,
            dateOfBirth: getFormattedDate(new Date(this.props.data.dateOfBirth)),
            gender: this.props.data.gender,
        };
        this.store.userId = this.props.data.id;
    }

    componentDidUpdate(prevProps: IUserFormProps): void {
        if (prevProps.formType !== this.store.formType) {
            this.store.formType = this.props.formType;
        }

        if (prevProps.isEditForm !== this.store.isEditForm) {
            this.store.isEditForm = this.props.isEditForm || false;
        }

        if (prevProps.successMessage !== this.store.successMessage) {
            this.store.successMessage = this.props.successMessage;
        }

        if (!isEqual(this.props.data, prevProps.data)) {
            this.store.formValues = this.props.data
                ? {
                    name: this.props.data.name,
                    email: this.props.data.email,
                    dateOfBirth: getFormattedDate(new Date(this.props.data.dateOfBirth)),
                    gender: this.props.data.gender,
                }
                : this.store.EMPTY_FORM_VALUES;
            this.store.userId = this.props.data ? this.props.data.id : -1;
        }
    }

    render(): React.ReactNode {
        let date = this.store.formValues.dateOfBirth == "" ? new Date() : new Date(this.store.formValues.dateOfBirth);
        return (
            <form className={this.props.className ? "form " + this.props.className : "form"} onSubmit={this.controller.handleSubmit}>
                {
                    this.store.isEditForm
                        ? void 0
                        : <div className={"form__toggle"}>
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
                }
                {
                    this.store.isAddChecked || this.store.isEditForm
                        ? <div className={"label__container"}>
                            <label className={"form__field"}>
                                ФИО
                                <input name="name" onChange={this.controller.handleInputChange}
                                       value={this.store.formValues.name}/>
                            </label>
                            <label className={"form__field"}>
                                Почта
                                <input name="email"
                                       onChange={this.controller.handleInputChange}
                                       type={"email"} value={this.store.formValues.email}
                                       readOnly={this.props.isEditForm}
                                />
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
                                    <Radio valuesObject={
                                        [
                                            {title: EGender.MALE, isChecked: this.store.formValues.gender == 0},
                                            {title: EGender.FEMALE, isChecked: this.store.formValues.gender == 1}
                                        ]
                                    } onChange={this.controller.onChangeGender}/>
                                </div>
                            </div>
                        </div>
                        :
                        <label className={"form__field"}>
                            Почта
                            <input name="email" type={"email"}
                                   onChange={this.controller.handleInputEmailChange}
                                   value={this.store.formValues.email}
                            />
                        </label>
                }

                <input className={"form__button"} type={"submit"} value="Сохранить"/>
                <Popup
                    isVisible={this.store.isPopupVisible}
                    isError={this.store.isError}
                    popupText={this.store.message}
                    onClose={this.controller.handleClose}
                />
            </form>
        )
    }
}