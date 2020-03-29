import {TeamProfileStore} from "./TeamProfileStore";
import {autobind} from "core-decorators";
import {ITeamProfileProps} from "./ITeamProfileProps";
import {isUndefined} from "lodash";
import {UserStore} from "../../components/user-store";

@autobind
export class TeamProfileController {
    private readonly store: TeamProfileStore;

    constructor(store: TeamProfileStore) {
        this.store = store;
    }

    acceptParticipant(participantId: number): void {
        this.store.transport
            .applyUserEventRequest(participantId)
            .then(this.store.onSuccessAccept)
            .then(this.getTeamParticipants)
            .catch(this.store.onErrorImpl);
    }

    deleteParticipant(participantId: number): void {
        this.store.transport
            .removeParticipant(participantId)
            .then(this.store.onSuccessDelete)
            .then(this.getTeamParticipants)
            .catch(this.store.onErrorImpl);
    }

    onComponentDidMount(): void {
        this.store.transport.getTeamCoaches(this.store.teamId).then(this.store.onSuccess);
        this.getTeamParticipants();
        if (!UserStore.getInstance().isLogin()) {
            return;
        }
        this.store.transport.getUserTeams().then(this.store.onSuccessGetUserTeams)
    }

    getTeamParticipants(): void {
        this.store.transport
            .getTeamParticipants(this.store.teamId)
            .then(this.store.onSuccessGetParticipants)
            .catch(this.store.onError)
    }

    onComponentWillMount(props: ITeamProfileProps): void {
        if (isUndefined(props.match)) return;

        this.store.teamId = props.match.params.teamId || -1;
    }

    showForm(): void {
        this.store.isVisible = true;
    }

    closeForm(): void {
        this.store.isVisible = false;
    }

    onSuccessAdd(): void {
        this.getTeamParticipants();
        this.store.isVisible = false;
    }
}