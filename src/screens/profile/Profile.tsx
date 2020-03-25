import * as React from "react";
import {ERoles, UserStore} from "../../components/user-store";
import Select from "react-select";
import "./Profile.scss";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import {EPath} from "../../EPath";
import {AdminProfile} from "./components/admin-profile";
import {LocalAdminProfile} from "./components/local-admin-profile";
import {UserProfile} from "./components/user-profile";
import {SecretaryProfile} from "./components/secretary-profile";
import {render} from "react-dom";

@autobind
@observer
export class Profile extends React.Component {
    render(): React.ReactNode {
        if (!UserStore.getInstance().isLogin()) {
            window.location.replace(EPath.LOGIN);
            return void 0;
        }
        let profile: React.ReactNode = <div/>;
        switch (localStorage.getItem("role")) {
            case ERoles.ADMIN: profile = <AdminProfile/>; break;
            case ERoles.LOCAL_ADMIN: profile = <LocalAdminProfile/>; break;
            case ERoles.USER: profile = <UserProfile/>; break;
            case ERoles.SECRETARY: profile = <SecretaryProfile/>; break;
            default: profile = <div/>;
        }

        return (
            <div className={"container profile"}>
                <p className={"profile-info-item"}>Роль: {UserStore.getInstance().role}</p>
                {profile}
            </div>
        )
    }
}