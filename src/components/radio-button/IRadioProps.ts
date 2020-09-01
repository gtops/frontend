import {IRadioItem} from "./IRadioItem";

export interface IRadioProps {
    values?: string[],
    valuesObject?: IRadioItem[],

    onChange?(value: string): void;
}