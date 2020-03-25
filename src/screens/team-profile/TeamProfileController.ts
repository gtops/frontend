import {TeamProfileStore} from "./TeamProfileStore";
import {autobind} from "core-decorators";
import {ITeamProfileProps} from "./ITeamProfileProps";
import {isUndefined} from "lodash";

@autobind
export class TeamProfileController {
    private readonly store: TeamProfileStore;

    constructor(store: TeamProfileStore) {
        this.store = store;
    }

    onComponentDidMount(): void {
        this.store.transport.getTeamCoaches(this.store.teamId).then(this.store.onSuccess);
        this.store.transport.getTeamParticipants(this.store.teamId).then(this.store.onSuccessGetParticipants)
    }

    onComponentWillMount(props: ITeamProfileProps): void {
        if (isUndefined(props.match)) return;

        this.store.teamId = props.match.params.teamId || -1;
    }
}