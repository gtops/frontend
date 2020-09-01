import React from "react";
import {IEventHeadingProps} from "./IEventHeadingProps";
import {autobind} from "core-decorators";
import {EventHeadingStore} from "./EventHeadingStore";
import {EventHeadingController} from "./EventHeadingController";
import {observer} from "mobx-react";
import classNames from "classnames";
import {getDateString} from "../../../../services/utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./EventHeading.scss"
import {isEqual} from "lodash";
import {ERoles, UserStore} from "../../../../components/user-store";
import {EPath} from "../../../../EPath";
import {EEventStatus} from "../../EEventStatus";

@autobind
@observer
export class EventHeading extends React.Component<IEventHeadingProps> {
    private readonly store = new EventHeadingStore();
    private readonly controller = new EventHeadingController(this.store);

    componentWillMount(): void {
        this.controller.onComponentWillMount(this.props);
    }

    componentDidMount(): void {
        this.controller.onComponentDidMount();
    }

    componentDidUpdate(): void {
        if (isEqual(this.store.canEditEvent, this.props.canEditEvent)) return;

        this.store.canEditEvent = this.props.canEditEvent
    }

    render(): React.ReactNode {
        let startDate = this.store.startDate == "" ? new Date() : new Date(this.store.startDate);
        let expirationDate = this.store.expirationDate == "" ? new Date() : new Date(this.store.expirationDate);

        return (
            <div className={"event-heading"}>
                <a className={"back-link"} href={EPath.EVENTS}>Вернуться к списку мероприятий</a>
                {
                    this.store.isChangingName
                        ?
                        <div>
                            <input onChange={this.controller.setNewName} className={"input__field -name"}
                                   value={this.store.newName}/>
                            <div className={"button -small"} onClick={this.controller.changeEventName}>Сохранить</div>
                            <div className={"button -small"} onClick={this.controller.cancelNameChanging}>Отменить</div>
                        </div>
                        : <h1
                            onClick={this.controller.editName}
                            className={classNames({"event-name": true, "-editable": this.store.canEditEvent})}>
                            {this.store.event.name}
                        </h1>

                }
                {this.getStatuses()}
                <p>
                    Начало: {getDateString(this.store.event.startDate)}
                    {
                        this.store.canEditEvent
                            ? <span className={"edit-link"} onClick={this.controller.toggleChangeStartDate}/>
                            : void 0
                    }
                </p>
                {
                    this.store.showChangeStartDate
                        ? <div>
                            <DatePicker
                                onChange={this.controller.setStartDate}
                                selected={startDate}
                                maxDate={new Date(this.store.event.expirationDate)}
                                className="input__field"
                            />
                            <div className={"button -small"} onClick={this.controller.changeStartDate}>Сохранить</div>
                        </div>
                        : void 0
                }

                <p>
                    Завершение: {getDateString(this.store.event.expirationDate)}
                    {
                        this.store.canEditEvent
                            ? <span className={"edit-link"} onClick={this.controller.toggleChangeExpirationDate}/>
                            : void 0
                    }
                </p>
                {
                    this.store.showChangeExpirationDate
                        ? <div>
                            <DatePicker
                                onChange={this.controller.setExpirationDate}
                                selected={expirationDate}
                                minDate={new Date(this.store.event.startDate)}
                                className="input__field"
                            />
                            <div className={"button -small"} onClick={this.controller.changeExpirationDate}>Сохранить</div>
                        </div>
                        : void 0
                }
                {this.getRequestBlock()}
                {
                    this.props.hasOrgRights && this.store.event.status === EEventStatus.COMPLETED &&
                    <div>
                        <a href={EPath.ALL_RESULTS.replace(":eventId", this.store.eventId.toString())}>
                            Посмотреть общую
                            таблицу
                        </a><br/>
                        <button disabled={this.store.isLoading} onClick={this.controller.generateCSV}>Генерировать csv-отчет</button>
                        {this.store.isLoading && <span>Подождите, отчет генерируется</span>}
                        {this.store.csvLink !== "" && <a href={this.store.csvLink} download>Скачать</a>}
                    </div>

                }
            </div>
        )
    }

    private getStatuses(): React.ReactNode {
        const editable = this.store.getNextStatus() && UserStore.getInstance().role == ERoles.LOCAL_ADMIN;
        const classNameStatuses = classNames({
            "statuses": true,
            "-editable": editable
        });
        return (
            <p className={classNameStatuses}>
                {
                    this.store.statuses.map((status, index) => {
                        const classname = classNames({
                            "status": true,
                            "-curr": this.store.event.status === status,
                            "-next": this.store.getNextStatus() === status
                        });
                        const onClick =
                            editable && this.store.getNextStatus() === status
                                ? this.controller.changeStatus
                                : void 0;
                        return (
                            <span key={Math.random()} className={classname} onClick={onClick}>
                                {status}
                                {
                                    index === this.store.statuses.length - 1
                                        ? void 0
                                        : <span className={"status-separator"}> > </span>
                                }
                            </span>
                        )
                    })
                }
            </p>
        )
    }

    private getRequestBlock(): React.ReactNode {
        if (this.store.event.status !== EEventStatus.PREPARATION) return void 0;
        if (!UserStore.getInstance().isLogin()) {
            return (
                <p style={{color: "black"}}>
                    <a href={EPath.LOGIN}>Войдите</a> или <a href={EPath.REGISTRATION}>Зарегистрируйтесь</a>,
                    чтобы подать заявку на участие.
                </p>
            )
        } else if (this.store.isParticipant) {
            if (this.store.isConfirmed) {
                return <p style={{color: "green"}}>Ваша заявка на участие одобрена.</p>
            }
            return <div>
                <p style={{color: "orange"}}>Ваша заявка на рассмотрении.</p>
                <div style={{margin: 0}} className={"button -small"} onClick={this.controller.cancelRequest}>Отменить
                    заявку
                </div>
            </div>
        }
        return <div className={"button"} onClick={this.controller.sendEventRequest}>Подать заявку</div>
    }
}