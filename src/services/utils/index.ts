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

export function getQueryParams(path: string): object {
    let parts = path.split("?");
    if (parts.length < 2) return {};

    let paramsStr = parts[1];
    let params= paramsStr.split('&');
    let paramsMap = {};

    params.map(item => {
        let paramParts = item.split("=");
        if (paramParts.length < 2) return;

        paramsMap[paramParts[0]] = paramParts[1];
    });

    return paramsMap;
}