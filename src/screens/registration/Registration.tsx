import React from "react";
import {InputField} from "../../components/input-field";
import {observer} from "mobx-react";
import {RegistrationStore} from "./RegistrationStore";
import {autobind} from "core-decorators";
import {RegistrationController} from "./RegistrationController";

@observer
@autobind
export class Registration extends React.Component {
    private readonly store = new RegistrationStore();
    private readonly controller = new RegistrationController(this.store);

    componentWillMount(): void {
      this.controller.onComponentWillMount();
    }

    render(): React.ReactNode {
        return (
            <div className={"login"}>
                <div className={"form"}>
                    <div className={"form__content"}>
                        <h1 className={"header"}>Регистрация</h1>
                        <p className={"sub-header"}>Заполните поля для регистрации</p>
                        <div>
                            <p className={"field-name"}>Email</p>
                            <InputField isReadOnly={true} defaultValue={this.store.email}/>
                        </div>
                        <div>
                            <p className={"field-name"}>Имя</p>
                            <InputField type={"text"} setValue={this.store.setName}/>
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