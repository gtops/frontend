import * as React from "react";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import {TrialResultController} from "./TrialResultController";
import {ITrialResultProps} from "./ITrialResultProps";
import {TrialResultStore} from "./TrialResultStore";
import {EResultTypes} from "../user-result/EResultTypes";
import {Table} from "../../components/table";
import {getEventLink} from "../../services/utils";

@observer
@autobind
export class TrialResult extends React.Component<ITrialResultProps> {
    private readonly store = new TrialResultStore();
    private readonly controller = new TrialResultController(this.store);

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
                    <a href={getEventLink(this.store.orgId, this.store.eventId)} className={"back-link"}>Вернуться на
                        страницу мероприятия</a>
                    <h1>{this.store.name}</h1>
                    <form className={"form"} onSubmit={this.controller.findUserById}>
                        <label className={this.store.findError ? "form__field -search -error" : "form__field -search"}>
                            id пользователя
                            <input value={this.store.userId} onBlur={this.controller.onBlurUserIdInput} onChange={this.controller.onChangeUserId}/>
                        </label>
                    </form>
                    <Table className={"-type-result"}
                           columns={
                               [
                                   {accessor: "userId", title: "ID участника", className: "-type-number"},
                                   {accessor: "userName", title: "Имя участника"},
                                   {accessor: "dateOfBirth", title: "Дата рождения"},
                                   {accessor: "teamName", title: "Команда"},
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
                                   // {
                                   //     accessor: "_result",
                                   //     title: "Значок",
                                   //     cell: this.setResultCell,
                                   //     className: "-type-medal"
                                   // }
                               ]
                           }
                           data={this.store.data}/>
                </div>
            </div>
        )
    }

    private setPrimaryResultCell(data: any): React.ReactNode {
        let placeholder = this.store.type == EResultTypes.COUNT ? "0" : "00:00";
        return (
            <input
                maxLength={10}
                value={data.data.firstResult || ""}
                placeholder={placeholder}
                onChange={this.controller.onChangeInput}
                onBlur={this.controller.onBlur}
                id={data.data.userId}
            />
        )
    }
}