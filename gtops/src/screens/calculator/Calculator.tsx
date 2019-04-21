import * as React from "react";
import {InputField} from "../../components/input-field";
import {Radio} from "../../components/radio-button";
import "./Calculator.scss";
import {ERegExp} from "../../components/input-field/ERegExp";
import {CalculatorController} from "./CalculatorController";
import {Table} from "../../components/table";
import {CalculatorStore} from "./CalculatorStore";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import {get} from "lodash";
import {ICompetitionResult} from "../../services/Transport/responses";
import {EGender} from "./EGender";

@autobind
@observer
export class Calculator extends React.Component {
    private readonly store = new CalculatorStore();
    private readonly controller = new CalculatorController(this.store);

    componentDidMount(): void {
        this.store.cell = this.setCell;
        this.setColumns();
    }

    setColumns(): void {
        this.store.columns = [
            {accessor: "name_of_trial", title: "Соревнование", className: "name"},
            {accessor: "primary_result", title: "Первичный результат", cell: this.store.cell},
            {accessor: "secondary_result", title: "Приведенный результат"},
            {accessor: "result_for_gold", title: "золото"},
            {accessor: "result_for_silver", title: "серебро"},
            {accessor: "result_for_bronze", title: "бронза"},
        ]
    }

    render(): React.ReactNode {
        return (
            <div className={"calculator"}>
                <div className={"calculator__user-data"}>
                    <div className={"gender"}>
                        <span>Пол: </span>
                        <Radio values={[EGender.MALE, EGender.FEMALE]} onChange={this.controller.onRadioChange}/>
                    </div>
                    <label>Возраст:
                        <InputField
                            mask={ERegExp.ONLY_NUMBERS}
                            maxLength={3}
                            onBlur={this.controller.onBlur}
                            setValue={this.controller.setOld}
                        />
                        (полных лет)
                    </label>
                </div>
                <Table columns={this.store.columns} data={this.store.data}/>
            </div>
        )
    }

    private setCell(data: object): React.ReactNode {
        const result = get(data, "data") as ICompetitionResult;
        return (
            <InputField
                onBlur={this.controller.onBlurInput}
                placeholder={"Введите"}
                accessKey={result.trial_id}
                mask={ERegExp.ONLY_DOUBLE}
                maxLength={10}
            />
        )
    }
}