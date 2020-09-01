import React from "react";
import Select from "react-select";
import {OrgFormStore} from "./OrgFormStore";
import {OrgFormController} from "./OrgFormController";
import {IOrgFormProps} from "./IOrgFormProps";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import "./Form.scss";
import classNames from "classnames";
import {SimpleSelect} from "react-selectize";
import {values} from "mobx";

@autobind
@observer
export class OrgForm extends React.Component<IOrgFormProps> {
    protected readonly store = new OrgFormStore();
    protected readonly controller = new OrgFormController(this.store);

    componentDidMount(): void {
        this.controller.onComponentDidMount(this.props);
    }

    render(): React.ReactNode {
        let selectedOrg = this.store.selectedOrg.value == "" ? undefined : this.store.selectedOrg;
        return (
            <section className={"invite-section"}>
                <form className={"form"} onSubmit={this.controller.handleSubmit}>
                    {
                        this.store.isEditForm ?
                            <SimpleSelect
                                options={this.store.orgsList.map(item => {
                                    return {
                                        value: item.id, label: item.name
                                    }
                                })}
                                placeholder="Выберите организацию"
                                onValueChange={this.controller.onChangeOrg}
                                value={selectedOrg}
                            />
                            : void 0
                    }
                    <label className={"form__field"}>
                        Название
                        <input name="name" onChange={this.controller.handleInputChange}
                               value={this.store.formValues.name}/>
                    </label>
                    <label className={"form__field"}>
                        Адрес
                        <input name="address" onChange={this.controller.handleInputChange}
                               value={this.store.formValues.address}/>
                    </label>
                    <label className={"form__field"}>
                        Ответственное лицо
                        <input name="leader" onChange={this.controller.handleInputChange}
                               value={this.store.formValues.leader}/>
                    </label>
                    <label className={"form__field"}>
                        Номер телефона
                        <input name="phoneNumber" onChange={this.controller.handleInputChange}
                               value={this.store.formValues.phoneNumber}/>
                    </label>
                    <label className={"form__field"}>
                        Филиал
                        <input name="branch" onChange={this.controller.handleInputChange}
                               value={this.store.formValues.branch}/>
                    </label>

                    <div className={"form__line"}>
                        <label className={"form__field"}>
                            ОГРН
                            <input name="oqrn" onChange={this.controller.handleInputChange}
                                   value={this.store.formValues.oqrn}/>
                        </label>
                        <label className={"form__field"}>
                            Лицевой счёт
                            <input name="paymentAccount" onChange={this.controller.handleInputChange}
                                   value={this.store.formValues.paymentAccount}/>
                        </label>
                    </div>

                    <div className={"form__line"}>

                        <label className={"form__field"}>
                            БИК
                            <input name="bik" onChange={this.controller.handleInputChange}
                                   value={this.store.formValues.bik}/>
                        </label>
                        <label className={"form__field"}>
                            Расчётный счёт
                            <input name="correspondentAccount" onChange={this.controller.handleInputChange}
                                   value={this.store.formValues.correspondentAccount}/>
                        </label>
                    </div>

                    <input type={"submit"} className={"form__button"} value="Сохранить"/>
                    {
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
                    }
                </form>
            </section>
        )
    }
}

{/*<Select
                                isSearchable={true}
                                options={
                                    this.store.orgsList.map(item => {
                                        return {
                                            value: item.id, label: item.name
                                        }
                                    })
                                }
                                className="react-select-container"
                                classNamePrefix="react-select"
                                placeholder={"Выберите организацию"}
                                onChange={this.controller.onChange}
                            />*/
}