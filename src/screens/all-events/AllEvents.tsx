import React from "react";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import {AllEventsStore} from "./AllEventsStore";
import {AllEventsController} from "./AllEventsController";
import "./AllEvents.scss";
import {Tabs} from "../../components/tabs";
import {Table} from "../../components/table";
import classNames from "classnames";
import {Popup} from "../../components/popup/Popup";
import {EPath} from "../../EPath";
import {isEmpty} from "lodash";

@autobind
@observer
export class AllEvents extends React.Component {
    private readonly store: AllEventsStore = new AllEventsStore();
    private readonly controller: AllEventsController = new AllEventsController(this.store);

    componentDidMount(): void {
        this.controller.onComponentDidMount();
    }

    render(): React.ReactNode {
        return (
            <div className={"container all-events"}>
                <h1>Список организаций и мероприятий</h1>
                <p>Всего организаций: {this.store.orgsList.length}</p>
                <div className={"orgs-list"}>
                    {
                        this.store.orgsList.map(item => {
                            let events = this.store.events.get(item.data.id);
                            return (
                                <div className={classNames({"org-item": true, "-open": item.isVisible})}
                                     key={item.data.id}>
                                    <div className={"org-item__heading"}>
                                        <div className={"org-item__heading-item"}>
                                            <span className={"label"}>Организация</span>
                                            <span className={"value -name"}>{item.data.name}</span>
                                        </div>
                                        <div className={"org-item__heading-item"}>
                                            <span className={"label"}>Руководитель</span>
                                            <span className={"value"}>{item.data.leader}</span>
                                        </div>
                                        <div className={"org-item__heading-item"}>
                                            <span className={"label"}>Всего мероприятий</span>
                                            <span className={"value"}>{item.data.countOfAllEvents}</span>
                                        </div>
                                        <div className={"org-item__heading-item"}>
                                            <span className={"label"}>Активных мероприятий</span>
                                            <span className={"value -name"}>{item.data.countOfActiveEvents}</span>
                                        </div>
                                    </div>
                                    <div className={"org-item__body"}>
                                        <Table columns={[
                                            {
                                                accessor: "_name",
                                                title: "Название",
                                                className: "name",
                                                cell: this.setNameCell
                                            },
                                            {accessor: "startDate", title: "Дата начала"},
                                            {accessor: "status", title: "Статус"},
                                            {accessor: "", title: "", cell: this.setCell},
                                        ]}
                                               data={this.store.events.get(item.data.id)}
                                               className={"-type-orgs"}
                                        />
                                    </div>
                                    {
                                        item.data.countOfAllEvents === 0
                                            ? void 0
                                            : <div
                                                onClick={() => this.controller.onItemClick(item.data.id)}
                                                className={
                                                    classNames({
                                                        "link": true,
                                                        "-open": !item.isVisible,
                                                        "-close": item.isVisible
                                                    })
                                                }
                                            >
                                                {item.isVisible ? "Свернуть" :"Посмотреть мероприятия"}
                                            </div>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
                <Popup
                    isVisible={this.store.popupText !== ""}
                    isError={this.store.isError}
                    popupText={this.store.popupText}
                    onClose={this.controller.handleClose}
                />
            </div>
        )
    }

    private setCell(data: any): React.ReactNode {
        let isConfirmed = false;
        let isParticipant = false;
        this.store.userEvents.forEach(value => {
            if (value.id !== data.data.id) return;
            isParticipant = true;
            isConfirmed = value.isConfirmed;
        });

        if (isParticipant) {
            if (isConfirmed) {
                return (
                    <span style={{color: "green"}}>Заявка одобрена</span>
                )
            }
            return (
                <span>Заявка на рассмотрении</span>
            )
        }
        return <span style={{cursor: "pointer", margin: 0}} className={"button -small"}
                     onClick={() => this.controller.sendRequest(data.data.id)}>Подать заявку</span>
    }

    private setNameCell(data: any): React.ReactNode {
        return (
            <a href={EPath.EVENT_PROFILE.replace(":orgId", data.data.organizationId).replace(":eventId", data.data.id)}>
                {data.data.name}
            </a>
        )
    }
}