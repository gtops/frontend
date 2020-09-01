import {number, string} from "prop-types";
import {ILoginResponse} from "../transport/responses";
import {ERoles, UserStore} from "../../components/user-store";
import {AxiosError, AxiosResponse} from "axios";
import {EPath} from "../../EPath";

export function GetIdFromPathname(): number {
    const parts = window.location.pathname.split("/");
    const MIN_LEN = 3;

    if (parts.length < MIN_LEN) return -1;

    let id = +parts[MIN_LEN - 1];
    if (isNaN(id)) return -1;

    return id;
}

export function getFormattedDate(date: Date): string {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    let formattedMonth = month < 10 ? "0" + month : month.toString();
    let formattedDay = day < 10 ? "0" + day : day.toString();
    return `${year}-${formattedMonth}-${formattedDay}`
}

export function getFormattedDateTime(date: Date): string {
    let dateStr = getFormattedDate(date);
    let hours = date.getHours();
    let minutes = date.getMinutes();

    let formattedHours = hours < 10 ? "0" + hours : hours.toString();
    let formattedMinutes = minutes < 10 ? "0" + minutes : minutes.toString();

    return `${dateStr} ${formattedHours}:${formattedMinutes}:00`
}

export function getDateString(date: string): string {
    const dateLen = 10;
    let dateParts = date.slice(0, dateLen).split("-");
    if (dateParts.length !== 3) return date;
    return `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`;
}

interface IParams {
    [key: string]: string
}

export function getQueryParams(path: string): object {
    let parts = path.split("?");
    if (parts.length < 2) return {};

    let paramsStr = parts[1];
    let params = paramsStr.split('&');
    let paramsMap: IParams = {};

    params.map(item => {
        let paramParts = item.split("=");
        if (paramParts.length < 2) return;

        paramsMap[paramParts[0]] = paramParts[1];
    });

    return paramsMap;
}

export function setProfileData(data: ILoginResponse): void {
    UserStore.getInstance().token = data.accessToken;
    UserStore.getInstance().refreshToken = data.refreshToken;
    UserStore.getInstance().organizationId = data.organizationId || -1;
    UserStore.getInstance().role = data.role == "Простой пользователь" ? ERoles.USER : data.role as ERoles;
    UserStore.getInstance().id = data.userId;
}

export function getErrorMessage(error: AxiosError): string {
    let errors = error.response ? error.response.data.errors : [];
    return errors && errors.length > 0 ? errors[0].description : "";
}

export function getErrorCode(error: AxiosError): number {
    return error.response ? error.response.status : -1;
}

export function validateInputTime(value: string): boolean {
    if (value == "") return true;

    let parts = value.split(":");
    if (parts.length > 3) return false;

    let wasError = false;
    parts.forEach((part, index) => {
        if (isNaN(+part) && part !== "") wasError = true;
        if (part.indexOf(".") !== -1) wasError = true;

        const maxValue = index == 2 ? 100 : 60;
        if (+part >= maxValue || +part < 0) wasError = true;

    });
    return !wasError;
}

export function validateInputCount(value: string): boolean {
    return !isNaN(+value);
}

export function getFormattedResultCount(value: string): string {
    let parts = value.split(".");
    if (parts.length === 1) return value;
    let res = "";
    parts.forEach((item, index) => {
        if (item == "") {
            res += "0"
        } else {
            res += item
        }

        if (index !== parts.length - 1) {
            res += "."
        }
    });

    return res;
}

export function getFormattedResultTime(value: string): string {
    let parts = value.split(":");
    let result = "";
    parts.forEach((part, index) => {
        let formattedPart = "";
        if (part.length == 1) {
            formattedPart = "0" + part;
        } else if (part.length == 2) {
            formattedPart = part;
        } else {
            formattedPart = "00"
        }
        result += formattedPart;
        if (index !== parts.length - 1) {
            result += ":"
        }
    });
    let resultParts = result.split(":");
    if (resultParts.length == 0) {
        return "00:00:00"
    } else if (resultParts.length == 1) {
        return result += ":00:00";
    } else if (resultParts.length == 2) {
        return result += ":00";
    }

    return result;
}

export function getEventLink(orgId: number, eventId: number): string {
    return EPath.EVENT_PROFILE.replace(":orgId", orgId.toString()).replace(":eventId", eventId.toString())
}