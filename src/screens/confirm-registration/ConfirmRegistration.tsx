import React from "react";
import {InputField} from "../../components/input-field";
import {observer} from "mobx-react";
import {autobind} from "core-decorators";
import {ConfirmRegistrationStore} from "./ConfirmRegistrationStore";
import {ConfirmRegistrationController} from "./ConfirmRegistrationController";

@observer
@autobind
export class ConfirmRegistration extends React.Component {
    private readonly store = new ConfirmRegistrationStore();
    private readonly controller = new ConfirmRegistrationController(this.store);

    componentWillMount(): void {
      this.controller.onComponentWillMount();
    }

    render(): React.ReactNode {
        return (
            <div className={"login"}>
                <div className={"form"}>
                    <div className={"form__content"}>
                        <h1 className={"header"}>Регистрация</h1>
                        <p className={"sub-header"}>Заполните поля для завершения регистрации</p>
                        <div>
                            <p className={"field-name"}>Email</p>
                            <input className={"input__field read-only"} readOnly={true} value={this.store.email}/>
                        </div>
                        <div>
                            <p className={"field-name"}>Пароль</p>
                            <InputField type={"password"} setValue={this.store.setPassword}/>
                        </div>
                        <div>
                            <p className={"field-name"}>Повторите пароль</p>
                            <InputField type={"password"} setValue={this.store.setRepeatPassword}/>
                        </div>
                        {
                            this.store.isMessageShown
                                ? <div>Вы успешно зарегистрировались и будете перенаправлены на экран входа</div>
                                : <div onClick={this.controller.onSubmit} className={"button"}>Зарегестрироваться</div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}