import React from "react";
import {AllResultsStore} from "./AllResultsStore";
import {AllResultsController} from "./AllResultsController";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import {IAllResultsProps} from "./IAllResultsProps";
import "./AllResults.scss";
import {isUndefined} from "lodash";
import {getEventLink} from "../../services/utils";

@autobind
@observer
export class AllResults extends React.Component<IAllResultsProps> {
    private readonly store = new AllResultsStore();
    private readonly controller = new AllResultsController(this.store);

    componentDidMount(): void {
        this.controller.onComponentDidMount(this.props);
    }

    render(): React.ReactNode {
        return (
            <div className={"all-results"}>
                {
                    this.store.orgId !== -1 && this.store.eventId !== -1 &&
                    <div className={"container"}><a className={"back-link"}
                       href={getEventLink(this.store.orgId, this.store.eventId)}>Вернуться
                        на страницу мероприятия</a></div>
                }
                <table>
                    <thead>
                    <tr>
                        <th/>
                        {
                            this.store.allParticipants.map(participant => {
                                return <th key={Math.random()}>{participant.userName}</th>
                            })
                        }
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th>Общий значок</th>
                        {
                            this.store.allParticipants.map(participant => {
                                return <td key={Math.random()}>{participant.badge}</td>
                            })
                        }
                    </tr>
                    {
                        this.store.data.map(trial => {
                            return (
                                <tr key={Math.random()}>
                                    <th>{trial.trialName}</th>
                                    {
                                        this.store.allParticipants.map(participant => {
                                            let result = "";
                                            let user = trial.participants.find(value => value.userId === participant.userId);
                                            if (!isUndefined(user)) {
                                                result = user.firstResult;
                                            }
                                            return <td key={Math.random()}>{result}</td>
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}