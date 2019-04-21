import * as React from "react";
import {MenuStore} from "./MenuStore";
import {autobind} from "core-decorators";
import "./Menu.scss";
import {InputField} from "../input-field";
import {IMenuProps} from "./IMenuProps";
import {UserStore} from "../UserStore/UserStore";
import {SingletonClass} from "../UserStore/SingletoneClass";

@autobind
export class Menu extends React.Component<IMenuProps> {
    private readonly store = new MenuStore();

    componentDidMount(): void {
        console.log(SingletonClass.getInstance().getScore());
    }

    render(): React.ReactNode {
        return (
            <div className={"menu"}>
                {
                    UserStore.getInstance().isLogin()
                        ? <div className={"profile"} onClick={this.redirectToProfile}>Profile</div>
                        : void 0
                }
                <div className={"menu__items"}>
                    {this.getItems()}
                </div>
                <div className={"search__field"}>
                    <InputField
                        setValue={this.setValue}
                        defaultValue={"12-12-1312331"}
                    />
                    <div className={"search__icon"} onClick={this.onClickSearchButton}/>
                </div>
            </div>
        )
    }

    private onClickSearchButton(): void {
        window.location.replace(`/user-result/${this.store.inputValue}`);
    }

    private getItems(): React.ReactNode {
        return (
            this.store.items.map((item, index) => (
                <div className={"item"} key={index} onClick={item.onClick}>
                    <div className={"item__border"}/>
                    <div className={"item__content"}>{item.title}</div>
                </div>
            ))
        )
    }

    private setValue(value: string): void {
        this.store.inputValue = value;
    }

    private redirectToProfile(): void {
        window.location.replace("/profile");
    }
}