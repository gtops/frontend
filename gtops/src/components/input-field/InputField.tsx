import * as React from "react";
import {observer} from "mobx-react";
import {InputFieldStore} from "./InputFieldStore";
import {attempt, isUndefined} from "lodash";
import {IInputFieldProps} from "./IInputFieldProps";
import {autobind} from "core-decorators";

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
            <div>
                <input
                    onChange={this.onChange}
                    value={this.store.value}
                />
            </div>
        );
    }

    private onChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.store.value = event.target.value;
        attempt(this.props.setValue!, this.store.value)
    }

    getValue(): string {
        return this.store.value;
    }
}