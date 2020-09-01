import {Store} from "../../../../components/store";
import {autobind} from "core-decorators";
import {AxiosResponse} from "axios";
import {observable} from "mobx";
import {ITableData} from "../../../../components/table";
import {IGetEventParticipantsResponse} from "../../../../services/transport/responses";
import {getDateString} from "../../../../services/utils";

@autobind
export class EventParticipantsStore extends Store {
    @observable eventId = -1;
    @observable canEditEvent = false;
    @observable hasOrgRights = false;
    @observable participantData: ITableData[] = [];
    @observable isVisible = false;
    @observable searchValue = "";

    onSuccessAccept(response: AxiosResponse): void {
        console.log("[EventParticipantsStore.onSuccessAccept]: ", response);
    }

    onSuccessDelete(response: AxiosResponse): void {
        console.log("[EventParticipantsStore.onSuccessDelete]: ", response);
    }

    onSuccessGetEventParticipants(response: AxiosResponse<IGetEventParticipantsResponse[]>): void {
        console.log("[EventParticipantsStore.onSuccessGetEventParticipants]: ", response);
        this.participantData = response.data.map(item => {
            return (
                {
                    isVisible: true,
                    data: {
                        ...item,
                        _isConfirmed: item.isConfirmed ? "подтвержден" : "не подтвержден",
                        dateOfBirth: getDateString(item.dateOfBirth),
                    }
                }
            )
        }).filter(value => value.data.teamId === null)
    }
}