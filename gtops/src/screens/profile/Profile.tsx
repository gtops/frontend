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

@autobind
@observer
export class Profile extends React.Component {
    private readonly transport = new Transport();
    private readonly store = new ProfileStore();

    componentDidMount(): void {
        this.getAllRoles().then(this.onSuccess);
    }

    onSuccess(r: AxiosResponse<IRole[]>): void {
        this.store.roles = r.data;
    }

    getAllRoles(): Promise<AxiosResponse<IRole[]>> {
        return this.transport.getRoles();
    }

    render(): React.ReactNode {
        return (
            <div className={"profile"}>
                <div>Вы вошли как</div>
                <div>Введите почту для отправки приглашения</div>
                <InputField setValue={this.setValue}/>
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
                    onChange={this.onChange}
                />
                <button onClick={this.onSubmit}>send</button>
            </div>
        )
    }
    onSubmit(): void {
        this.transport.inviteUser({role_id: this.store.selectedRoleId, email: this.store.email}).then(console.log)
    }
    onChange(selectedOption: any): void {
        this.store.selectedRoleId = selectedOption.value;
    }

    setValue(value: string): void {
        this.store.email = value;
    }
}