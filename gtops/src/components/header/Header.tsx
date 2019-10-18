import React from "react";
import "./Header.scss";
import {Menu} from "../menu";
import {observer} from "mobx-react";
import {HeaderStore} from "./HeaderStore";
import {autobind} from "core-decorators";

@observer
@autobind
export class Header extends React.Component {
    private readonly store = new HeaderStore();

    render(): React.ReactNode {
        return (
            <div>
                <Menu isVisible={this.store.isMenuVisible}/>
                <div className={"header"}>
                    <div className={"header__container"}>
                        <div className="header__menu icon" onClick={this.onMenuClick}/>
                        <div className="header__logo" onClick={this.onLogoClick}>
                            <div className="header__logo-icon"/>
                            <span className="header__logo-text">ГТО - СЕРВИС</span>
                        </div>
                        <div className="header__profile icon"/>
                    </div>
                </div>
            </div>
        )
    }

    private onMenuClick(): void {
        this.store.isMenuVisible = !this.store.isMenuVisible;
    }

    private onLogoClick(): void {
        window.location.replace("/");
    }
}