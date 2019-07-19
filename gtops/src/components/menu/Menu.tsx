import * as React from "react";
import {MenuStore} from "./MenuStore";
import {autobind} from "core-decorators";
import "./Menu.scss";
import {InputField} from "../input-field";
import {IMenuProps} from "./IMenuProps";
import {UserStore} from "../user-store";
import {observer} from "mobx-react";

@autobind
@observer
export class Menu extends React.Component<IMenuProps> {
    private readonly store = new MenuStore();

    componentDidMount(): void {
        if (!UserStore.getInstance().isLogin()) {
            return;
        }
        this.store.items.push({title: "Профиль", onClick: Menu.redirectToProfile})
    }

    render(): React.ReactNode {
        return (
            <div className={"menu"}>
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

    private static redirectToProfile(): void {
        window.location.replace("/profile");
    }
}