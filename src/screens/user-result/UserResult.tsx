import {Table} from "../../components/table";
import * as React from "react";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import {UserResultStore} from "./UserResultStore";
import "./UserResult.scss";
import {UserResultController} from "./UserResultController";
import {EResultTypes} from "./EResultTypes";
import {IUserResultProps} from "./IUserResultProps";
import {getEventLink} from "../../services/utils";
import {EPath} from "../../EPath";

@autobind
@observer
export class UserResult extends React.Component<IUserResultProps> {
    private readonly store = new UserResultStore();
    private readonly controller = new UserResultController(this.store);

    componentWillMount(): void {
        this.controller.onComponentWillMount(this.props);
    }

    componentDidMount(): void {
        this.controller.onComponentDidMount();
    }

    render(): React.ReactNode {
        return (
            <div className={"user-result"}>
                <div className={"container"}>
                    {
                        this.store.teamName === ""
                            ? <a className={"back-link"} href={getEventLink(this.store.orgId, this.store.eventId)}>Вернуться
                                на странцу мероприятия</a>
                            : <a className={"back-link"} href={EPath.TEAM_PROFILE.replace(":teamId", this.store.teamId.toString())}>Вернуться
                                на страницу команды</a>
                    }
                    <p>{this.store.ageCategory}</p>
                    <div>
                        <span className={"info-count -gold"}>{this.store.countTestsForGold}</span>
                        <span className={"info-count -silver"}>{this.store.countTestForSilver}</span>
                        <span className={"info-count -bronze"}>{this.store.countTestsForBronze}</span>
                        {
                            this.store.badge === ""
                                ? void 0
                                : <span className={"info-count"}> результат:
                                    <span className={`info-count -${this.store.getBadgeValue(this.store.badge)}`}/>
                                </span>
                        }
                    </div>
                    <Table className={"-type-result"}
                           columns={
                               [
                                   {accessor: "trialName", title: "Соревнование"},
                                   {accessor: "isNecessary", title: "Обязательное", className: "-type-medal"},
                                   {
                                       accessor: "_primaryResult",
                                       title: "Первичный результат",
                                       cell: this.setPrimaryResultCell,
                                       className: "-type-number"
                                   },
                                   {
                                       accessor: "secondResult",
                                       title: "Приведенный результат",
                                       className: "-type-number"
                                   },
                                   {
                                       accessor: "resultForGold",
                                       title: "Золото",
                                       className: "-type-number"
                                   },
                                   {
                                       accessor: "resultForSilver",
                                       title: "Серебро",
                                       className: "-type-number"
                                   },
                                   {
                                       accessor: "resultForBronze",
                                       title: "Бронза",
                                       className: "-type-number"
                                   },
                                   {
                                       accessor: "_badge",
                                       title: "Значок",
                                       cell: this.setResultCell,
                                       className: "-type-medal"
                                   }
                               ]
                           }
                           data={this.store.data}/>
                </div>
            </div>
        )
    }

    private setResultCell(data: any): React.ReactNode {
        return (
            <div className={`result -${this.store.getBadgeValue(data.data.badge)}`}/>
        )
    }

    private setPrimaryResultCell(data: any): React.ReactNode {
        let placeholder = data.data.resultType == EResultTypes.COUNT ? "0" : "00:00:00";
        return (
            <input
                maxLength={10}
                accessKey={data.data.resultTrialOnEventId}
                value={data.data.firstResult || ""}
                placeholder={placeholder}
                onChange={this.controller.onChangeInput}
                onBlur={this.controller.onBlur}
            />
        )
    }
}