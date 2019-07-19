export enum EApiRoutes {
    GET_USER_INFO = "/api/participant/{:uid}",
    LOGIN = "/api/authorization/login",
    GET_TRIALS = "/api/participant/trial",
    GET_CALCULATED_RESULT = "/api/calculate",
    GET_ROLES = "/api/user/roles",
    INVITE = "/api/authorization/invite",
    GET_MAIL = "/api/authorization/registration/email",
    GET_CATEGORIES = "/api/participant/categories",
}