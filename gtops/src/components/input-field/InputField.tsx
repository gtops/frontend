import * as React from "react";
import {observer} from "mobx-react";
import {InputFieldStore} from "./InputFieldStore";
import {attempt, isUndefined, isEmpty} from "lodash";
import {IInputFieldProps} from "./IInputFieldProps";
import {autobind} from "core-decorators";
import "./InputField.scss";
import {ERegExp} from "./ERegExp";
import classNames from "classnames";

@observer
@autobind
export class InputField extends React.Component<IInputFieldProps> {
    private readonly store = new InputFieldStore();

    componentDidMount(): void {
        if (isUndefined(this.props.defaultValue)) {
            return;
        }
        this.store.value = this.props.defaultValue;
        attempt(this.props.setValue!, this.store.value);
    }

    render(): React.ReactNode {
        return (
            <input
                className={classNames({"input__field": true, "read-only": this.props.isReadOnly})}
                onChange={this.onChange}
                value={this.store.value}
                type={this.props.type}
                maxLength={this.props.maxLength}
                onBlur={this.props.onBlur}
                name={this.props.name}
                accessKey={this.props.accessKey}
                placeholder={this.props.placeholder}
                readOnly={this.props.isReadOnly}
            />
        );
    }

    private onChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        if (!isUndefined(this.props.mask) && !isEmpty(value)) {
            const mask = new RegExp(this.props.mask);
            if (mask.test(value) && this.checkDouble(value)) {
                this.store.value = value;
                attempt(this.props.setValue!, this.store.value);
            }
            return;
        }
        this.store.value = event.target.value;
        attempt(this.props.setValue!, this.store.value)
    }

    private checkDouble(value: string): boolean {
        if (this.props.mask !== ERegExp.ONLY_DOUBLE) {
            return true;
        }
        if (value.indexOf(".") !== -1 && value.replace(".", "") === this.store.value) {
            return value.split(".").length <= 2;
        }
        return true;
    }

    getValue(): string {
        return this.store.value;
    }
}