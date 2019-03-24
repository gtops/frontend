import React from "react";
import "./Header.scss";
import {Menu} from "../menu";

export class Header extends React.Component {
    render(): React.ReactNode {
        return (
            <div className={"header"}>
                <div className={"header__image"}/>
                <Menu/>
            </div>
        )
    }
}