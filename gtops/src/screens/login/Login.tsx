import React from "react";
import "./Login.scss";
import {InputField} from "../../components/input-field";
import {LoginStore} from "./img/LoginStore";
import {autobind} from "core-decorators";
import {Transport} from "../../services/Transport";
import {AxiosResponse} from "axios";
import {ILoginResponse} from "../../services/Transport/responses";
import {UserStore} from "../../components/user-store";

@autobind
export class Login extends React.Component {
    private readonly store = new LoginStore();
    private readonly transport = new Transport();

    render(): React.ReactNode {
        return (
            <div className={"login"}>
                <div className={"form"}>
                    <div className={"form__content"}>
                        <h1 className={"header"}>Вход</h1>
                        <p className={"sub-header"}>Заполните поля для входа</p>
                        <div>
                            <p className={"field-name"}>Email</p>
                            <InputField setValue={this.store.setEmail}/>
                        </div>
                        <div>
                            <p className={"field-name"}>Пароль</p>
                            <InputField type={"password"} setValue={this.store.setPassword}/>
                        </div>
                        <div className={"button"} onClick={this.onSubmit}>Войти</div>
                    </div>
                </div>
            </div>
        )
    }

    private onSubmit(): void {
        const params = {
            login: this.store.email,
            password: this.store.password
        };
        this.transport.login(params).then(this.onSuccess).catch(console.log);
    }

    onSuccess(response: AxiosResponse<ILoginResponse>): void {
        console.log("Login.onSuccess", response);
        UserStore.getInstance().token = response.data.token;
        window.location.replace("/profile");
    }
}