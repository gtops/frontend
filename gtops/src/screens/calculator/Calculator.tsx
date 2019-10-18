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
import {ICompetitionResult, ITrial} from "../../services/Transport/responses";
import {EGender} from "./EGender";
import {SimpleSelect} from "react-selectize";
import "react-selectize/themes/index.css";
import {IGetTrialsParams} from "../../services/Transport/params";

@autobind
@observer
export class Calculator extends React.Component {
    private readonly store = new CalculatorStore();
    private readonly controller = new CalculatorController(this.store);

    componentDidMount(): void {
        // this.controller.onComponentDidMount();
        this.store.cell = this.setCell;
        this.store.nameCell = this.setNameCell;
        this.setColumns();
    }

    setColumns(): void {
        this.store.columns = [
            {accessor: "trialName", title: "Соревнование", className: "name", cell: this.store.nameCell},
            {accessor: "resultForGold", title: "золото"},
            {accessor: "resultForSilver", title: "серебро"},
            {accessor: "resultForBronze", title: "бронза"},
            {accessor: "primary_result", title: "Первичный результат", cell: this.store.cell},
            {accessor: "secondResult", title: "Приведенный результат"}
        ]
    }

    render(): React.ReactNode {
        const options = this.getOptions();
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

    private getOptions(): {value: string, label: string}[] {
        const res: {value: string, label: string}[] = [];
        this.store.categories.forEach(item => {
            const genderId = this.store.gender === EGender.MALE ? 1 : 2;
            if (item.gender_id === genderId) {

            }
        });
        return res;
    }

    private setNameCell(data: object): React.ReactNode {
        const result = get(data, "data") as ICompetitionResult;
        return (
            <div
                className={"visible-control"}
                onClick={() => this.controller.onClickVisible(result.trial_id)}
            >
                Скрыть
            </div>
        )
    }

    private setCell(data: object): React.ReactNode {
        const result = get(data, "data") as ITrial;
        return (
            <InputField
                onBlur={this.controller.onBlurInput}
                placeholder={"Введите"}
                accessKey={result.trialId}
                mask={ERegExp.ONLY_DOUBLE}
                maxLength={10}
            />
        )
    }
}