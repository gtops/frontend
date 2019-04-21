import React from "react";
import {UserStore} from "../../components/UserStore/UserStore";
import {InputField} from "../../components/input-field";

export class Registration extends React.Component {
    componentDidMount(): void {
        const parsedUrl = window.location.search.split("=");
        if (parsedUrl.length < 2) {
            return;
        }
        UserStore.Instance.token = parsedUrl[1];
        history.replaceState("", "", "/user/invite");
    }

    render(): React.ReactNode {
        return (
            <div className={"login"}>
                <div className={"form"}>
                    <div className={"form__content"}>
                        <h1 className={"header"}>Вход</h1>
                        <p className={"sub-header"}>Заполните поля для входа</p>
                        <div>
                            <p className={"field-name"}>Email</p>
                            <InputField />
                        </div>
                        <div>
                            <p className={"field-name"}>Пароль</p>
                            <InputField type={"password"} />
                        </div>
                        <div>
                            <p className={"field-name"}>Повторите пароль</p>
                            <InputField type={"password"} />
                        </div>
                        <div className={"button"} >Войти</div>
                    </div>
                </div>
            </div>
        )
    }
}