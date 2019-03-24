import * as React from "react";
import {autobind} from "core-decorators";
import {Transport} from "../../services/Transport";
import {AxiosError, AxiosResponse} from "axios";
import {IGetUserInfoResponse} from "../../services/Transport/responses";
import {InputField} from "../../components/input-field";
import "./Home.scss";
import {Table} from "../../components/table/Table";
import {Menu} from "../../components/menu";

@autobind
export class Home extends React.Component {
    render(): React.ReactNode {
        return (
            <div>
            </div>
        )
    }
}