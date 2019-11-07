import * as React from "react";
import {UserStore} from "../../components/user-store";
import Select from "react-select";
import "./Profile.scss";
import {InputField} from "../../components/input-field";
import {AxiosResponse} from "axios";
import {IRole} from "../../components/user-store";
import {Transport} from "../../services/Transport";
import {ProfileStore} from "./ProfileStore";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import {IGetRolesResponse} from "../../services/Transport/responses/IGetRolesResponse";
import {ProfileController} from "./ProfileController";

@autobind
@observer
export class Profile extends React.Component {
    private readonly store = new ProfileStore();
    private readonly controller = new ProfileController(this.store);

    componentDidMount(): void {
        this.controller.onComponentDidMount();
    }

    render(): React.ReactNode {
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
            </div>
        )
    }
}