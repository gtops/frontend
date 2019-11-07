import React from "react";
import "./Header.scss";
import {Menu} from "../menu";
import {observer} from "mobx-react";
import {HeaderStore} from "./HeaderStore";
import {autobind} from "core-decorators";
import {HeaderController} from "./HeaderController";
import EventListener from "react-event-listener";
import {EPath} from "../../EPath";

@observer
@autobind
export class Header extends React.Component {
    private readonly store = new HeaderStore();
    private readonly controller = new HeaderController(this.store);

    render(): React.ReactNode {
        return (
            <div>
                <Menu isVisible={this.store.isMenuVisible}/>
                <div className={"header"}>
                    <div className={"header__container"}>
                        <div className="header__menu icon" onClick={this.controller.onMenuClick}/>
                        <div className="header__logo">
                            <a href={EPath.HOME} className={"header__logo-link"}></a>
                            <div className="header__logo-icon"/>
                            <span className="header__logo-text">ГТО - СЕРВИС</span>
                        </div>
                        <div className="header__profile icon"/>
                    </div>
                </div>
                <EventListener target={document} onClick={this.controller.onMenuOutsideClick} />
            </div>
        )
    }
}