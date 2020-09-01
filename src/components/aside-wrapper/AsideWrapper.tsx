import * as React from "react";
import {IAsideWrapperProps} from "./IAsideWrapperProps";
import classNames from "classnames";
import "./AsideWrapper.scss";

export class AsideWrapper extends React.Component<IAsideWrapperProps> {
    render(): React.ReactNode {
        return (
            <div className={classNames({"aside-wrapper": true, "-shown": this.props.isVisible})}>
                <div className={"content"}>
                    <h2>{this.props.title}</h2>
                    {this.props.component}
                    <div className={"delete-icon"} onClick={this.props.onClose}/>
                </div>
            </div>
        )
    }
}