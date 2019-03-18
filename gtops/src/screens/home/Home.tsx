import * as React from "react";
import {autobind} from "core-decorators";
import {Transport} from "../../services/Transport";
import {AxiosError, AxiosResponse} from "axios";
import {IGetUserInfoResponse} from "../../services/Transport/responses";
import {InputField} from "../../components/input-field";

@autobind
export class Home extends React.Component {
    private readonly transport: Transport;
    private value = "";

    constructor(props: {}) {
        super(props);
        this.transport = new Transport();
    }

    private onButtonClick(): void {
        this.transport.getUserInfo(this.value).then(this.onSuccess).catch(this.onError)
    }

    private onSuccess(response: AxiosResponse<IGetUserInfoResponse>): void {

    }

    private onError(error: AxiosError): void {

    }

    private setValue(value: string): void {
        this.value = value;
    }

    render(): React.ReactNode {
        return (
            <div>
                <div>Hello,world</div>
                <InputField setValue={this.setValue} defaultValue={"12-12-1312331"}/>
                <button onClick={this.onButtonClick}>Get Info</button>
            </div>
        )
    }
}