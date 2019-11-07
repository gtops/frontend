export enum EApiRoutes {
    GET_USER_INFO = "/api/participant/{:uid}",
    LOGIN = "/login",
    GET_TRIALS = "/trial?age={:age}&gender={:gender}",
    GET_CALCULATED_RESULT = "/trial/result?firstResult={:firstResult}&trialId={:trialId}",
    GET_ROLES = "/role",
    INVITE = "/organization/invite",
    GET_MAIL = "/api/authorization/registration/email",
    GET_CATEGORIES = "/api/participant/categories",
}