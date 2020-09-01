import {EFormTypes} from "../../EFormTypes";

export interface IUser {
    id: number,
    name: string,
    email: string,
    gender: number,
    dateOfBirth: string
}

export interface IUserFormProps {
    successMessage: string;
    formType: EFormTypes;
    id: number;
    isEditForm?: boolean;
    className?: string;
    data?: IUser;
    onSuccess?: () => void;
}