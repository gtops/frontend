import * as React from "react";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import {EventProfileStore} from "./EventProfileStore";
import {Redirect} from "react-router";
import {EventProfileController} from "./EventProfileController";
import {IEventProfileProps} from "./IEventProfileProps";
import {ERoles, UserStore} from "../../components/user-store";
import "./EventProfile.scss";
import classNames from "classnames";
import "react-datepicker/dist/react-datepicker.css";
import {SimpleSelect} from "react-selectize";
import {EventHeading} from "./components/event-heading";
import {Tabs} from "../../components/tabs";
import {EventTrials} from "./components/event-trials";
import {EventParticipants} from "./components/event-participants";
import {EventTeams} from "./components/event-teams";
import {EventSecretary} from "./components/event-secretary";
import {EventTable} from "./components/event-table";
import {EventJudges} from "./components/event-judges/EventJudges";
import {EPath} from "../../EPath";

@autobind
@observer
export class EventProfile extends React.Component<IEventProfileProps> {
    private readonly store: EventProfileStore = new EventProfileStore();
    private readonly controller: EventProfileController = new EventProfileController(this.store);

    componentWillMount(): void {
        this.controller.onComponentWillMount(this.props);
    }

    componentDidMount(): void {
        this.controller.onComponentDidMount();
    }

    render(): React.ReactNode {
        return (
            this.store.eventId == -1 || this.store.orgId == -1
                ? <Redirect to={"/"}/>
                : (
                    <div className={"container event-profile"}>
                        <EventHeading
                            eventId={this.store.eventId}
                            orgId={this.store.orgId}
                            canEditEvent={this.store.canEdit()}
                            hasOrgRights={this.store.hasOrgRights()}
                            update={this.store._update$}
                        />
                        <Tabs tabs={
                            [
                                {
                                    name: "Таблица перевода",
                                    isVisible: this.store.hasOrgRights(),
                                    isActive: this.store.hasOrgRights(),
                                    component: <EventTable canEdit={this.store.canEdit()} eventId={this.store.eventId}/>,
                                    className: "-table"
                                },
                                {
                                    name: "Виды спорта",
                                    isActive: !this.store.hasOrgRights(),
                                    component:
                                        <EventTrials
                                            orgId={this.store.orgId}
                                            eventId={this.store.eventId}
                                            canEditEvent={this.store.canEdit()}
                                            hasOrgRights={this.store.hasOrgRights()}
                                            startDate={new Date(this.store.event.startDate)}
                                            expirationDate={new Date(this.store.event.expirationDate)}
                                        />,
                                    className: "-trials"
                                },
                                {
                                    name: "Участники",
                                    component:
                                        <EventParticipants
                                            eventId={this.store.eventId}
                                            canEditEvent={this.store.canEdit()}
                                            update={this.store._update$}
                                            hasOrgRights={this.store.hasOrgRights()}
                                        />,
                                    className: "-participant"
                                },
                                {
                                    name: "Команды",
                                    component:
                                        <EventTeams
                                            orgId={this.store.orgId}
                                            eventId={this.store.eventId}
                                            canEditEvent={this.store.canEdit()}
                                        />,
                                    className: "-team"
                                },
                                {
                                    name: "Секретари",
                                    isVisible: UserStore.getInstance().role === ERoles.LOCAL_ADMIN && this.store.hasOrgRights(),
                                    component:
                                        <EventSecretary
                                            canEdit = {this.store.canEdit()}
                                            orgId={this.store.orgId}
                                            eventId={this.store.eventId}
                                        />,
                                    className: "-secretary"
                                },
                                {
                                    name: "Судьи",
                                    isVisible: this.store.hasOrgRights(),
                                    component: <EventJudges canEdit={this.store.canEdit()} orgId={this.store.orgId} eventId={this.store.eventId}/>,
                                    className: "-clock"
                                },
                            ]
                        } isMain={false} classNameHeading={"-links"}/>
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
                    </div>
                )
        )
    }
}