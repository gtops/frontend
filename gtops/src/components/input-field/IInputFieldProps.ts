import {ERegExp} from "./ERegExp";
import * as React from "react";

export interface IInputFieldProps {
    defaultValue?: string;
    className?: string;
    type?: string;
    mask?: ERegExp;
    maxLength?: number;
    name?: string;
    placeholder?: string;
    accessKey?: string;

    onBlur?(event: React.FocusEvent<HTMLInputElement>): void;

    setValue?(value: string): void;
}