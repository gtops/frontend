import React from "react";
import {IEventJudgesProps} from "./IEventJudgesProps";
import {Table} from "../../../../components/table";
import {EventJudgesStore} from "./EventJudgesStore";
import {EventJudgesController} from "./EventJudgesController";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import {SimpleSelect} from "react-selectize";
import classNames from "classnames";
import {EEventStatus} from "../../EEventStatus";

@autobind
@observer
export class EventJudges extends React.Component<IEventJudgesProps> {
    private readonly store = new EventJudgesStore();
    private readonly controller = new EventJudgesController(this.store);

    componentWillMount(): void {
        this.controller.onComponentWillMount(this.props);
    }

    componentDidMount(): void {
        this.controller.onComponentDidMount();
    }

    render(): React.ReactNode {
        return (
            <div>
                {
                    this.props.canEdit
                        ? <form className={"form"} style={{display: "block"}}
                                onSubmit={this.controller.handleSubmitJudgesForm}>
                            <SimpleSelect
                                options={this.store.judgesCatalog}
                                value={this.store.selectedJudge}
                                onValueChange={this.controller.onValueJudgeChange}
                                placeholder={"Выберите судью"}
                            />
                            <SimpleSelect
                                value={this.store.selectedTrial}
                                onValueChange={this.controller.onChangeTrial}
                                options={this.store.trials}
                                placeholder={"Выберите вид спорта"}
                            />
                            <input style={{margin: 0}} type={"submit"} className={"button"} value={"Добавить"}/>
                        </form>
                        : <p>Добавление судей к видам спорта доступно только при статусе мероприятия
                            '{EEventStatus.PREPARATION}'.</p>
                }

                {
                    this.store.message === ""
                        ? void 0
                        : <p className={classNames({"message": true, "-type-error": this.store.isError})}>
                            {this.store.message}
                        </p>
                }
            </div>
        )
    }
}