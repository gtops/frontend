export interface ITrial {
    is_main_trial: boolean;
    name_of_trial: string;
    result_for_bronze: number;
    result_for_gold: number;
    result_for_silver: number;
    trial_id: number;
}

interface ITrialGroup {
    trial_group: ITrial[]
}

export interface IGetTrialsResponse {
    age_category_id: number;
    count_all_trials: number;
    count_trial_for_bronze: number;
    count_trial_for_gold: number;
    count_trial_for_silver: number;
    trials: ITrialGroup[];
}