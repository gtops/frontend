import React from "react";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import {EventFormStore} from "./EventFormStore";
import {EventFormController} from "./EventFormController";

@autobind
@observer
export class EventForm extends React.Component {
    protected readonly store = new EventFormStore();
    protected readonly controller = new EventFormController(this.store);

    render(): React.ReactNode {
        return (
            <section className={"add-event-section"}>
                <form className={"form"} onSubmit={this.controller.handleSubmit}>
                    <label className={"form__name label"}>
                        Название:
                        <input name="name" onChange={this.controller.handleInputChange}
                               value={this.store.formValues.name}/>
                    </label>
                    <label className={"form__address label"}>
                        Дата начала:
                        <input name="startDate" type={"date"} onChange={this.controller.handleInputChange}
                               value={this.store.formValues.startDate}/>
                    </label>
                    <label className={"form__leader label"}>
                        Дата окончания:
                        <input name="expirationDate" type={"date"} onChange={this.controller.handleInputChange}
                               value={this.store.formValues.expirationDate}/>
                    </label>
                    <label className={"label"}>
                        Описание:
                        <textarea name="description" onChange={this.controller.handleInputChange}
                               value={this.store.formValues.description}/>
                    </label>

                    <input type={"submit"} value="Сохранить"/>
                    {/*
                        this.store.isPopupVisible ?
                            <div className={"popup-wrapper"}>
                                <div className={classNames({
                                    "popup": true,
                                    "-type-error": this.store.isError
                                })}>
                                    {this.store.popupText}
                                    <div className={"popup__close-icon"} onClick={this.controller.handleCloseClick}/>
                                </div>
                            </div>
                            : void 0
                    */}
                </form>
            </section>
        )
    }
}