import {AxiosError} from "axios";

export interface ISecretaryFormProps {
    orgId: number;
    onSuccess?:() => void;
}