import * as React from "react";
import {UserStore} from "../../components/user-store";
import Select from "react-select";
import "./Profile.scss";
import {InputField} from "../../components/input-field";
import {ProfileStore} from "./ProfileStore";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import {ProfileController} from "./ProfileController";
import {EPath} from "../../EPath";

@autobind
@observer
export class Profile extends React.Component {
    private readonly store = new ProfileStore();
    private readonly controller = new ProfileController(this.store);

    componentDidMount(): void {
        this.controller.onComponentDidMount();
    }

    render(): React.ReactNode {
        if (!UserStore.getInstance().isLogin()) {
            window.location.replace(EPath.LOGIN);
            return void 0;
        }
        return (
            <div className={"profile"}>
                <div>Вы вошли как</div>
                <div>Введите почту для отправки приглашения</div>
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
                <button onClick={this.controller.onSubmit}>send</button>
                {
                    this.store.isSuccessPopupVisible
                        ? <div>Приглашение успешно отправлено</div>
                        : void 0
                }
            </div>
        )
    }
}