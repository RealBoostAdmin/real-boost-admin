import {supabase} from '../../supabase/client';
import {
    ProfileMissionModel,
    PostProfileMissionModel,
    PutProfileMissionModel
} from '../../models/mission_profile/profile_mission';

export const getProfilesOfMission: ProfileMissionModel[] | any = async (missionId: string) => {

    const {data: profilesMissions, error: errorProfilesMissions} = await supabase
        .from('_profiles_missions')
        .select('*')
        .eq('profile_mission->>mission_id', missionId)

    return {profilesMissions, errorProfilesMissions};
}

export const getProfileMission: ProfileMissionModel | any = async (profileId: string, missionId: string) => {

    const query = await supabase
        .from('profiles_missions')
        .select('*')
        .match({profile_id: profileId, mission_id: missionId})
        .limit(1)

    return query;
}

export const createProfileMission: any = async (postProfileData: PostProfileMissionModel) => {
    const {data, error: errorProfileMission} = await supabase
        .from('profiles_missions')
        .insert([postProfileData])
        .single();

    return {data, errorProfileMission};
}

export const updateProfileMission: any = async (postProfileData: PutProfileMissionModel, id: string) => {
    const {data, error: errorProfileMission} = await supabase
        .from('profiles_missions')
        .update([postProfileData])
        .match({id: id})
        .single();

    return {data, errorProfileMission};
}

export const deleteProfileMission: any = async (id: string) => {
    const {data, error} = await supabase
        .from('profiles_missions')
        .delete()
        .match({id: id})

    return {data, error};
}
