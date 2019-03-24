export interface IInputFieldProps {
    defaultValue?: string;
    className?: string;

    setValue?(value: string): void;
}