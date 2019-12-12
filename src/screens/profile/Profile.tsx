import * as React from "react";
import {ERoles, UserStore} from "../../components/user-store";
import Select from "react-select";
import "./Profile.scss";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import {EPath} from "../../EPath";
import {AdminProfile} from "./components/admin-profile";

@autobind
@observer
export class Profile extends React.Component {
    render(): React.ReactNode {
        if (!UserStore.getInstance().isLogin()) {
            window.location.replace(EPath.LOGIN);
            return void 0;
        }
        switch (UserStore.getInstance().role) {
            case ERoles.ADMIN: return <AdminProfile/>;
            default: return void 0;
        }
    }
}