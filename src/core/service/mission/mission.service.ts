import {supabase} from '../../supabase/client';
import {FilterEnabledModel} from '../../models/utils/filters/filterEnabled.model';
import {
    MissionFilterModel,
    MissionModel,
    PatchMissionModel,
    PostMissionModel
} from '../../models/mission/mission.model';
import {FilterModel} from '../../models/utils/filters/filter.model';
import {filtersHelper} from "../../helpers/filters/filters.helper";

export const getMission: MissionModel | any = async (code: string) => {

    let query = supabase
        .from('_missions')
        .select('*')
        .match({code: code})
        .limit(1)

    return query;
}

export const getLastMission: MissionModel[] | any = async () => {
    let query = supabase
        .from('missions')
        .select('*')
        .order('created_at', {ascending: false})
        .limit(1)

    return query;
}

export const getMissions: MissionModel[] | any = async (
    filtersEnabled?: FilterEnabledModel[] | null,
    currentPage: number = 1,
    search?: string | null,
    sort: string = 'code',
    limit: number | null = 10
) => {
    const startRange = (currentPage * limit) - limit;
    const endRange = currentPage * limit - 1;

    let query = supabase
        .from('_missions')
        .select('*')
        .range(startRange, endRange)

    filtersEnabled && filtersEnabled.forEach((filterEnabled: FilterEnabledModel) => {query = filtersHelper(filterEnabled, query)});
    if (search) query.or(`code.ilike.%${search}%,currency.ilike.%${search}%,${Number(search) ? `total.eq.${Number(search)},` : ``}user->>username.ilike.%${search}%`)

    query.order(sort)

    return query;
}

export const getCountMissions = async (
    filtersEnabled?: FilterEnabledModel[] | null,
    search?: string | null,
) => {
    let query = supabase
        .from('_missions')
        .select('code', {count: 'exact'})

    filtersEnabled && filtersEnabled.forEach((filterEnabled: FilterEnabledModel) => {query = filtersHelper(filterEnabled, query)});
    if (search) query.or(`code.ilike.%${search}%,currency.ilike.%${search}%,${Number(search) ? `total.eq.${Number(search)},` : ``}user->>username.ilike.%${search}%`)


    return query;
}

export const getFiltersMission = async () => {
    const {data: missionStateData, error} = await supabase
        .from('_mission_states')
        .select('*')

    const missionStates: FilterModel[] = [];

    missionStateData.forEach((item: any) => {
        missionStates.push({id: item.state, label: item.state})
    });

    const listValues: MissionFilterModel = {
        state: missionStates,
    };

    return {listValues, error};
}

export const createMission: any = async (postMissionData: PostMissionModel) => {
    const {data, error} = await supabase
        .from('missions')
        .insert([postMissionData])
        .single();

    return {data, error};
}

export const updateMission: any = async (patchMissionData: PatchMissionModel, id: string) => {
    const {data, error} = await supabase
        .from('missions')
        .update(patchMissionData)
        .match({id: id})
        .single();

    return {data, error};
}

export const deleteMission: any = async (id: string) => {
    const {data, error} = await supabase
        .from('missions')
        .delete()
        .match({id: id})

    return {data, error};
}
