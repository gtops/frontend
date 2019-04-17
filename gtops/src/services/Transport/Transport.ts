import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";
import {get} from "lodash";
import {EApiRoutes} from "./EApiRoutes";
import {IGetUserInfoResponse, ILoginResponse} from "./responses";
import {ILoginParams} from "./params";
import {IGetTrialsParams} from "./params/IGetTrialsParams";
import {IGetTrialsResponse} from "./responses/IGetTrialsResponse";

export class Transport {
    private static BASE_URL: string;
    private readonly client = axios.create({baseURL: Transport.BASE_URL});
    config = require("./config/config.json");

    constructor() {
        Transport.BASE_URL = get(this.config, "url.base");
        const options: AxiosRequestConfig = {baseURL: Transport.BASE_URL};
        this.client = axios.create(options);
    }

    async getUserInfo(id: string): Promise<AxiosResponse<IGetUserInfoResponse>> {
        return this.client.get(`${EApiRoutes.GET_USER_INFO}`.replace("{:uid}", id));
    }

    async login(params: ILoginParams): Promise<AxiosResponse<ILoginResponse>> {
        return this.client.post(EApiRoutes.LOGIN, params);
    }

    async getTrials(params: IGetTrialsParams): Promise<AxiosResponse<IGetTrialsResponse>> {
        return this.client.post(EApiRoutes.GET_TRIALS, params);
    }

    // POST /api/participant/trial - список соревенований
    // gender_id - айдишник пола
    // old - возраст
}