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

@autobind
@observer
export class Profile extends React.Component {
    render(): React.ReactNode {
        if (!UserStore.getInstance().isLogin()) {
            window.location.replace(EPath.LOGIN);
            return void 0;
        }
        switch (localStorage.getItem("role")) {
            case ERoles.ADMIN: return <AdminProfile/>;
            case ERoles.LOCAL_ADMIN: return <LocalAdminProfile/>;
            case ERoles.USER: return <UserProfile/>;
            default: return <div/>;
        }
    }
}