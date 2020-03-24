export enum EApiRoutes {
    GET_USER_INFO = "/api/participant/{:uid}",
    LOGIN = "/api/v1/auth/login",
    GET_TRIALS = "/api/v1/trial/{:age}/{:gender}",
    GET_CALCULATED_RESULT = "/api/v1/trial/{:trialId}/firstResult?firstResult={:firstResult}",
    GET_ROLES = "/api/v1/role",
    INVITE = "/api/v1/auth/invite",
    VALIDATE_TOKEN = "/api/v1/invite/isValid",
    GET_CATEGORIES = "/api/participant/categories",
    REGISTRATION = "/api/v1/auth/confirmAccount",
    ORGANIZATIONS = "/api/v1/organization",
    ORGANIZATION = "/api/v1/organization/{:id}",
    ADMIN = "/api/v1/organization/{:id}/localAdmin",
    ORG_ADMIN = "/api/v1/organization/{:orgId}/localAdmin/{:idLocalAdmin}",
    ORG_ADMINS = "/api/v1/organization/{:id}/localAdmin",
    ADMIN_EXIST = "/api/v1/organization/{:id}/localAdmin/existingAccount",
    EVENTS = "/api/v1/organization/{:id}/event",
    EVENT = "/api/v1/organization/{:orgId}/event/{:eventId}",
    REFRESH = "/api/v1/auth/refresh",
    SECRETARY = "/api/v1/organization/{:orgId}/event/{:eventId}/secretary",
    SECRETARY_EXIST = "/api/v1/organization/{:orgId}/event/{:eventId}/secretary/existingAccount",
    REMOVE_SECRETARY = "/api/v1/organization/{:orgId}/event/{:eventId}/secretary/{:secretaryId}",
    TEAMS = "/api/v1/organization/{:orgId}/event/{:eventId}/team",
    EVENT_REQUEST = "/api/v1/event/{:eventId}/apply",
    EVENT_PARTICIPANTS = "/api/v1/event/{:eventId}/participant",
    EVENT_PARTICIPANT = "/api/v1/event/{:eventId}/participant/{:participantId}",
}