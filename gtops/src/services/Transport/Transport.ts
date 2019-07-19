import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";
import {get} from "lodash";
import {EApiRoutes} from "./EApiRoutes";
import {IGetCategoriesResponse, IGetEmailResponse, IGetUserInfoResponse, ILoginResponse} from "./responses";
import {IGetCalculationResultParams, ILoginParams, IGetTrialsParams, IInviteParams} from "./params";
import {IGetTrialsResponse} from "./responses/IGetTrialsResponse";
import {IRole} from "../../components/user-store";

export class Transport {
    private static BASE_URL: string;
    private client = axios.create({baseURL: Transport.BASE_URL});
    config = require("./config/config.json");

    constructor() {
        Transport.BASE_URL = get(this.config, "url.base");
        const options = {baseURL: Transport.BASE_URL};
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

    async getCategories(): Promise<AxiosResponse<IGetCategoriesResponse[]>> {
        return this.client.get(EApiRoutes.GET_CATEGORIES);
    }

    async getCalculationResult(params: IGetCalculationResultParams): Promise<AxiosResponse<IGetTrialsResponse>> {
        return this.client.post(EApiRoutes.GET_CALCULATED_RESULT, params);
    }

    async getRoles(): Promise<AxiosResponse<IRole[]>> {
        const options = {baseURL: Transport.BASE_URL, headers: {token: localStorage.getItem("token")}};
        const client = axios.create(options);
        return client.get(EApiRoutes.GET_ROLES);
    }

    async inviteUser(params: IInviteParams): Promise<AxiosResponse> {
        const options = {baseURL: Transport.BASE_URL, headers: {token: localStorage.getItem("token")}};
        const client = axios.create(options);
        return client.post(EApiRoutes.INVITE, params);
    }

    async getEmail(): Promise<AxiosResponse<IGetEmailResponse>> {
        const options = {baseURL: Transport.BASE_URL, headers: {invite_token: localStorage.getItem("token")}};
        console.log(localStorage.getItem("token"));
        const client = axios.create(options);
        return client.get(EApiRoutes.GET_MAIL);
    }
}