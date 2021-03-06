export enum EApiRoutes {
    GET_PARTICIPANT_INFO = "/api/participant/{:uid}",
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
    SECRETARY_EXIST = "/api/v1/organization/{:orgId}/secretary",
    REMOVE_SECRETARY = "/api/v1/organization/{:orgId}/event/{:eventId}/secretary/{:secretaryId}",
    ORG_SECRETARY_CATALOG = "/api/v1/organization/{:orgId}/secretary",
    REMOVE_SECRETARY_FROM_ORG = "/api/v1/organization/{:orgId}/secretary/{:secretaryId}",
    ADD_SECRETARY_IN_EVENT = "/api/v1/organization/{:orgId}/event/{:eventId}/secretary/{:secretaryOnOrganizationId}",
    TEAMS = "/api/v1/organization/{:orgId}/event/{:eventId}/team",
    EVENT_REQUEST = "/api/v1/event/{:eventId}/apply",
    EVENT_PARTICIPANTS = "/api/v1/event/{:eventId}/participant",
    EVENT_PARTICIPANT = "/api/v1/participant/{:participantId}",
    USER_EVENTS = "/api/v1/event/forUser",
    SECRETARY_EVENTS = "/api/v1/event/forSecretary",
    COACH_TEAMS = "/api/v1/team",
    TEAM_COACHES = "/api/v1/team/{:teamId}/teamLead",
    TEAM_PARTICIPANT = "/api/v1/team/{:teamId}/participant",
    USER_INFO = "/api/v1/auth/info",
    COACH = "/api/v1/teamLead/{:teamLeadId}",
    TEAM = "/api/v1/team/{:teamId}",
    TEAM_ACCEPT = "/api/v1/team/{:teamId}/confirm",
    SPORT_OBJECT = "/api/v1/organization/{:orgId}/sportObject",
    SPORT_OBJECT_ITEM = "/api/v1/organization/{:orgId}/sportObject/{:sportObjectId}",
    JUDGES = "/api/v1/organization/{:orgId}/referee",
    REMOVE_JUDGE = "/api/v1/organization/{:orgId}/referee/{:judgeId}",
    REMOVE_JUDGE_FROM_TRIAL = "/api/v1/refereeInTrialOnEvent/{:judgeId}",
    TABLES = "/api/v1/tables",
    ADD_TABLE = "/api/v1/event/{:eventId}/table/{:tableId}",
    GET_EVENT_TRIALS = "/api/v1/event/{:eventId}/freeTrials",
    ADD_EVENT_TRIAL = "/api/v1/event/{:eventId}/trial",
    REMOVE_EVENT_TRIAL = "/api/v1/trialInEvent/{:trialInEventId}",
    GET_EVENT_ADDED_TRIALS = "/api/v1/event/{:eventId}/trial",
    CANCEL_REQUEST = "/api/v1/event/{:eventId}/unsubscribe",
    ADD_JUDGE_IN_TRIAL = "/api/v1/trialInEvent/{:trialInEventId}/refereeInOrganization/{:refereeInOrganizationId}",
    GET_CURRENT_EVENT_TABLE = "/api/v1/event/{:eventId}/table",
    CHANGE_EVENT_STATUS = "/api/v1/event/{:eventId}/changeStatus",
    GET_USER_RESULT = "/api/v1/event/{:eventId}/user/{:userId}/result",
    GET_TRIAL_RESULT = "/api/v1/trialInEvent/{:trialInEventId}/result",
    PUT_FIRST_RESULT = "/api/v1/resultTrialInEvent/{:resultTrialInEventId}",
    EDIT_PARTICIPANT = "/api/v1/participant/{:participantId}",
    ALL_RESULTS = "/api/v1/event/{:eventId}/allResults",
    GET_CSV = "/api/v1/event/{:eventId}/allResults/csv",
}