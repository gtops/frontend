import React from "react";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import {IEventTrialsProps} from "./IEventTrialsProps";
import {SimpleSelect} from "react-selectize";
import {EventTrialsStore} from "./EventTrialsStore";
import {EventTrialsController} from "./EventTrialsController";
import classNames from "classnames";
import {isEqual} from "lodash";
import {Table} from "../../../../components/table";
import {EPath} from "../../../../EPath";
import {IJudge} from "../../../../services/transport/responses/IGetEventAddedTrialsResponse";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {isUndefined} from "lodash";
import ru from 'date-fns/locale/ru';
import "./EventTrials.scss"
import {ConfirmPopup} from "../../../../components/confirm-popup";
import {AddForm} from "../../../../components/add-form";

@autobind
@observer
export class EventTrials extends React.Component<IEventTrialsProps> {
    private readonly store = new EventTrialsStore();
    private readonly controller = new EventTrialsController(this.store);

    componentWillMount(): void {
        this.controller.onComponentWillMount(this.props);
    }

    componentDidMount(): void {
        this.controller.onComponentDidMount();
    }

    componentDidUpdate(): void {
        if (!isEqual(this.store.hasOrgRights, this.props.hasOrgRights)) {
            this.store.hasOrgRights = this.props.hasOrgRights
        }

        if (!isEqual(this.store.canEditEvent, this.props.canEditEvent)) {
            this.store.canEditEvent = this.props.canEditEvent
        }
    }

    render(): React.ReactNode {
        return (
            <div className={"trial-form"}>
                {
                    this.store.hasOrgRights && this.store.canEditEvent
                        ? <div>
                            {
                                this.store.message === ""
                                    ? void 0
                                    : <p className={classNames({"message": true, "-type-error": this.store.isError})}>
                                        {this.store.message}
                                    </p>
                            }
                            <AddForm form={this.getAddForm()} buttonText={"Добавить"}/>
                        </div>
                        : void 0
                }

                <Table columns={
                    this.store.hasOrgRights && this.store.canEditEvent
                        ? [
                            {accessor: "_trialName", title: "Название", cell: this.setNameCell, className: "name"},
                            {accessor: "sportObjectName", title: "Спортивный объект"},
                            {accessor: "startDateTime", title: "Дата и время начала"},
                            {accessor: "_judges", title: "Судьи", cell: this.setJudgeCell},
                            {accessor: "delete", title: "", cell: this.setDeleteCell},
                        ]
                        : [
                            {accessor: "_trialName", title: "Название", cell: this.setNameCell, className: "name"},
                            {accessor: "sportObjectName", title: "Спортивный объект"},
                            {accessor: "startDateTime", title: "Дата и время начала"},
                            {accessor: "_judges", title: "Судьи", cell: this.setJudgeCell},
                        ]} data={this.store.addedTrials}
                />
                <ConfirmPopup
                    isVisible={this.store.isConfirmPopupVisible}
                    onSubmit={this.controller.onDelete}
                    onCancel={this.store.closePopup}
                    popupText={"Вы действительно хотите удалить соревнование?"}
                />
            </div>
        )
    }

    private setDateCell(data: any): React.ReactNode {
        return (
            <DatePicker
                onChange={(date, event) => this.controller.changeStartDate(date, event, data.data.trialInEventId)}
                selected={new Date(data.data.startDateTime)}
                maxDate={this.props.expirationDate}
                minDate={this.props.startDate}
                className="input__field"
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="Время"
                dateFormat="dd.MM.yyyy HH:mm"
                locale={ru}
            />
        )
    }

    private getAddForm(): React.ReactNode {
        let startDate = isUndefined(this.store.startDate) ? this.props.startDate : this.store.startDate;
        return (
            <div className={"form -shadowed"}>
                <SimpleSelect
                    value={this.store.selectedTrial}
                    onValueChange={this.controller.onChangeTrial}
                    options={this.store.trials}
                    placeholder={"Выберите вид спорта"}
                />
                <SimpleSelect
                    value={this.store.selectedObject}
                    onValueChange={this.controller.onChangeObject}
                    options={this.store.sportObjects}
                    placeholder={"Выберите место проведения"}
                />
                <label className={"form__field"}>
                    Дата и время проведения
                    <DatePicker
                        onChange={this.controller.setStartDate}
                        selected={startDate}
                        maxDate={this.props.expirationDate}
                        minDate={this.props.startDate}
                        className="input__field"
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="Время"
                        dateFormat="dd.MM.yyyy HH:mm"
                        locale={ru}
                    />
                </label>
                <input className={"form__button"} onClick={this.controller.addTrial} value={"Добавить"}/>
            </div>
        )
    }

    private setDeleteCell(data: any): React.ReactNode {
        return <span onClick={() => this.store.showPopup(data.data.trialInEventId)} className={"delete-icon"}/>
    }

    private setNameCell(data: any): React.ReactNode {
        return (
            <a href={EPath.TRIAL_RESULT.replace(":trialInEventId", data.data.trialInEventId)}>
                {data.data.trialName}
            </a>)
    }

    private setJudgeCell(data: any): React.ReactNode {
        if (!data.data.referies.length) {
            return <span>Судьи не назначены</span>
        }

        if (data.data.isAllJudgesVisible) {
            return <div>
                {
                    data.data.referies.map((item: IJudge) => {
                            return (
                                <p key={Math.random()}>
                                    {item.name}
                                    {
                                        this.store.canEditEvent
                                            ?
                                            <span onClick={() => this.controller.deleteJudge(item.refereeOnTrialInEventId)}
                                                  style={{display: "inline-block", marginLeft: "5px"}}
                                                  className={"delete-icon"}/>
                                            : void 0
                                    }

                                </p>)
                        }
                    )
                }
            </div>
        }

        if (data.data.referies.length == 1) {
            return <span>{data.data.referies[0].name}</span>
        }
        return <span>{data.data.referies[0].name} <a onClick={() => this.controller.showJudges(data.data.trialId)}
                                                     style={{
                                                         cursor: "pointer",
                                                         textDecoration: "underline"
                                                     }}>и еще {data.data.referies.length - 1}</a></span>
    }
}