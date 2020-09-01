import {AllResultsStore} from "./AllResultsStore";
import {autobind} from "core-decorators";
import {IAllResultsProps} from "./IAllResultsProps";
import {isUndefined} from "lodash";

@autobind
export class AllResultsController {
    private readonly store: AllResultsStore;

    constructor(store: AllResultsStore) {
        this.store = store
    }

    onComponentDidMount(props: IAllResultsProps): void {
        if (isUndefined(props.match) || isUndefined(props.match.params) || isUndefined(props.match.params.eventId)) {
            return;
        }

        this.store.eventId = props.match.params.eventId;

        this.store.transport
            .getAllEventResults(props.match.params.eventId)
            .then(this.store.onSuccessGetResult)
            .catch(this.store.onError);
    }
}