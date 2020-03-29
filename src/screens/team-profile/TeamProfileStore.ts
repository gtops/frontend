import {Store} from "../../components/store";
import {autobind} from "core-decorators";
import {observable} from "mobx";
import {AxiosResponse} from "axios";
import {
    IGetEventParticipantsResponse, IGetTeamCoachesResponse,
    IGetTeamsResponse
} from "../../services/transport/responses";
import {ITableData} from "../../components/table";

@autobind
export class TeamProfileStore extends Store {
    @observable teamId = -1;
    @observable coaches: ITableData[] = [];
    @observable participants: ITableData[] = [];
    @observable isVisible = false;
    @observable canEditEvent = false;

    onSuccess(response: AxiosResponse<IGetTeamCoachesResponse[]>) {
        console.log("[TeamProfileStore.onSuccess]: ", response);
        this.coaches = response.data.map(item => {
            return {
                isVisible: true,
                data: item,
            }
        })
    }

    onSuccessGetUserTeams(response: AxiosResponse<IGetTeamsResponse[]>) {
        console.log("[TeamProfileStore.onSuccessGetUserTeams]: ", response);
        response.data.forEach(value => {
            if (this.teamId == value.id) {
                this.canEditEvent = true;
            }
        })
    }

    onSuccessGetParticipants(response: AxiosResponse<IGetEventParticipantsResponse[]>) {
        console.log("[TeamProfileStore.onSuccessGetParticipants]: ", response);
        this.participants = response.data.map(item => {
            return {
                isVisible: true,
                data: item,
            }
        })
    }
}