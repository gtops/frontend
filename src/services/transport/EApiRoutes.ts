export enum EApiRoutes {
    GET_USER_INFO = "/api/participant/{:uid}",
    LOGIN = "/api/v1/auth/login",
    GET_TRIALS = "/api/v1/trial/{:age}/{:gender}",
    GET_CALCULATED_RESULT = "/api/v1/trial/{:trialId}/firstResult/{:firstResult}",
    GET_ROLES = "/api/v1/role",
    INVITE = "/api/v1/invite",
    VALIDATE_TOKEN = "/api/v1/invite/isValid",
    GET_CATEGORIES = "/api/participant/categories",
    REGISTRATION = "/api/v1/auth/registration",
}