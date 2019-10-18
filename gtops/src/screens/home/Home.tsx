import * as React from "react";
import {autobind} from "core-decorators";
import {Transport} from "../../services/Transport";
import {AxiosError, AxiosResponse} from "axios";
import {IGetUserInfoResponse} from "../../services/Transport/responses";
import {InputField} from "../../components/input-field";
import "./Home.scss";
import {Table} from "../../components/table/Table";
import {Menu} from "../../components/menu";
import {HomeStore} from "./HomeStore";

@autobind
export class Home extends React.Component {
    private readonly store = new HomeStore();

    render(): React.ReactNode {
        return (
            <div className={"home"}>
                <div className={"cards"}>
                    {
                        this.store.cards.map((item, index) =>
                            <div key={index} className={`card ${item.className}`}>
                                <div className={"card__content"}>
                                    <div className={`card__img ${item.className}`}/>
                                    <div className={"card__title"}>{item.title}</div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}