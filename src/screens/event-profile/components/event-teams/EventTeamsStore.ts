import {Store} from "../../../../components/store";
import {autobind} from "core-decorators";
import {AxiosResponse} from "axios";
import {observable} from "mobx";
import {ITableData} from "../../../../components/table";
import {IGetEventParticipantsResponse, IGetTeamsResponse} from "../../../../services/transport/responses";

@autobind
export class EventTeamsStore extends Store {
    @observable eventId = -1;
    @observable orgId = -1;
    @observable canEditEvent = false;
    @observable teamsData: ITableData[] = [];
    @observable teamName = "";

    onSuccessAccept(response: AxiosResponse): void {
        console.log("[EventParticipantsStore.onSuccessAccept]: ", response);
    }

    onSuccessDelete(response: AxiosResponse): void {
        console.log("[EventParticipantsStore.onSuccessDelete]: ", response);
    }

    onSuccessGetTeams(response: AxiosResponse<IGetTeamsResponse[]>): void {
        console.log("[EventProfileStore.onSuccessGetTeams]: ", response);
        this.teamsData = response.data.map(item => {
            return (
                {
                    isVisible: true,
                    data: item
                }
            )
        });
    }

    onSuccessAddTeam(response: AxiosResponse): void {
        console.log("[EventProfileStore.onSuccessAddTeam]: ", response);
        this.isError = false;
        this.teamName = "";
        this.message = "Команда успешно добавлена.";

        setTimeout(() => {this.message = ""}, 3000)
    }
}