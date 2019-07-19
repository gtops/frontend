import React from "react";
import {UserStore} from "../../components/user-store";
import {InputField} from "../../components/input-field";
import {Transport} from "../../services/Transport";
import {IGetEmailResponse} from "../../services/Transport/responses";
import {AxiosResponse} from "axios";
import {observer} from "mobx-react";
import {RegistrationStore} from "./RegistrationStore";

@observer
export class Registration extends React.Component {
    private readonly transport = new Transport();
    private readonly store = new RegistrationStore();

    componentDidMount(): void {
        const parsedUrl = window.location.search.split("=");
        if (parsedUrl.length < 2) {
            return;
        }
        UserStore.getInstance().token = parsedUrl[1];
        history.replaceState("", "", "/user/invite");
        this.transport.getEmail().then(this.onSuccessGetEmail);
    }

    private onSuccessGetEmail(response: AxiosResponse<IGetEmailResponse>): void {
        this.store.email = response.data.email;
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
                            <p className={"field-name"}>Пароль</p>
                            <InputField type={"password"} />
                        </div>
                        <div>
                            <p className={"field-name"}>Повторите пароль</p>
                            <InputField type={"password"} />
                        </div>
                        <div className={"button"} >Зарегестрироваться</div>
                    </div>
                </div>
            </div>
        )
    }
}