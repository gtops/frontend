export enum EPath {
    HOME = "/",
    CALCULATOR = "/calculator",
    EVENTS = "/events",
    USER_RESULT = "/user-result/:eventId/:userId",
    LOGIN = "/login",
    REGISTRATION = "/registration",
    CONFIRM_REGISTRATION = "/registration/confirm",
    PROFILE = "/profile",
    EVENT_PROFILE = "/event/:orgId/:eventId",
    TEAM_PROFILE = "/team/:teamId",
    ORGANISATION_PROFILE = "/organisation/:id",
    TRIAL_RESULT = "/trial-result/:trialInEventId",
    ALL_RESULTS = "/event-result/:eventId",
}