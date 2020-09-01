import {Store} from "../../../../components/store";
import {autobind} from "core-decorators";
import {AxiosResponse} from "axios";
import {observable} from "mobx";
import {ITableData} from "../../../../components/table";
import {IGetSecretaries, IGetTeamsResponse} from "../../../../services/transport/responses";
import {OptionValue} from "react-selectize";
import {getDateString} from "../../../../services/utils";

@autobind
export class EventSecretaryStore extends Store {
    @observable eventId = -1;
    @observable orgId = -1;
    @observable secretariesCatalog: OptionValue[] = [];
    @observable secretaries: ITableData[] = [];
    @observable selectedSecretary?: OptionValue;

    onSuccessAccept(response: AxiosResponse): void {
        console.log("[EventParticipantsStore.onSuccessAccept]: ", response);
    }

    onSuccessDelete(response: AxiosResponse): void {
        console.log("[EventParticipantsStore.onSuccessDelete]: ", response);
    }

    onSuccessAddSecretaryInEvent(response: AxiosResponse): void {
        console.log("[EventProfileStore.onSuccessAddSecretaryInEvent]: ", response);
        this.selectedSecretary = undefined;
    }

    onSuccessGetSecretariesCatalog(response: AxiosResponse<IGetSecretaries[]>): void {
        console.log("[EventProfileStore.onSuccessGetSecretariesCatalog]: ", response);
        if (!response.data.length) return;

        this.secretariesCatalog = response.data.map(item => {
            return (
                {
                    label: `${item.name} (${item.email})`,
                    value: item.secretaryOnOrganizationId
                }
            )
        });
    }

    onSuccessGetSecretaries(response: AxiosResponse<IGetSecretaries[]>): void {
        console.log("[EventProfileStore.onSuccessGetSecretaries]: ", response);
        this.secretaries = response.data.map(item => {
            return (
                {
                    isVisible: true,
                    data: {
                        ...item,
                        dateOfBirth: getDateString(item.dateOfBirth)
                    }
                }
            )
        });
    }

    onSuccessDeleteSecretary(response: AxiosResponse): void {
        console.log("[EventProfileStore.onSuccessDeleteSecretary]: ", response);
    }
}