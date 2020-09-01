import {IAddFormProps} from "./IAddFormProps";
import * as React from "react";
import {observer} from "mobx-react";
import {autobind} from "core-decorators";
import {AddFormStore} from "./AddFormStore";

@observer
@autobind
export class AddForm extends React.Component<IAddFormProps> {
    private readonly store = new AddFormStore();

    render() {
        return (
            <div className={"add-form-container"}>
                <div
                    onClick={this.toggleVisibility}
                    className={this.store.isFormVisible ? "add-button -opened" : "add-button -closed"}
                >
                    {this.store.isFormVisible ? "Скрыть" : this.props.buttonText}
                </div>
                {
                    this.store.isFormVisible
                        ? this.props.form
                        : void 0
                }
            </div>
        )
    }

    private toggleVisibility(): void {
        this.store.isFormVisible = !this.store.isFormVisible
    }
}