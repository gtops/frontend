import React from "react";
import {ObjectFormStore} from "./ObjectFormStore";
import {ObjectFormController} from "./ObjectFormController";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import {IObjectFormProps} from "./IObjectFormProps";
import {Popup} from "../../../../../../components/popup/Popup";

@autobind
@observer
export class ObjectForm extends React.Component<IObjectFormProps> {
    private readonly store = new ObjectFormStore();
    private readonly controller = new ObjectFormController(this.store);

    componentDidMount(): void {
        this.store.onSuccessProp = this.props.onSuccess
    }

    render(): React.ReactNode {
        return (
            <div>
                <form className={"form -shadowed"} onSubmit={this.controller.handleSubmit}>
                    <div className={"label__container"}>
                        <label className={"form__field"}>
                            Название
                            <input name="name" onChange={this.controller.handleInputChange}
                                   value={this.store.formValues.name}/>
                        </label>
                        <label className={"form__field"}>
                            Адрес
                            <input name="address" type={"text"}
                                   onChange={this.controller.handleInputChange}
                                   value={this.store.formValues.address}/>
                        </label>
                        <label className={"form__field"}>
                            Описание
                            <textarea name="description" onChange={this.controller.handleInputChange}
                                      value={this.store.formValues.description}/>
                        </label>
                    </div>
                    <input className={"form__button"} type={"submit"} value={"Сохранить"}/>
                </form>
                <Popup
                    popupText={this.store.message}
                    isVisible={this.store.message !== ""}
                    isError={this.store.isError}
                    onClose={this.controller.onClosePopup}
                />
            </div>
        )
    }
}