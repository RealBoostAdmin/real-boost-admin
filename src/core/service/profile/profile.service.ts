import {supabase} from '../../supabase/client';
import {PatchProfileModel, PostProfileModel, ProfileModel} from '../../models/profile/profile.model';

export const getProfile: ProfileModel | any = async (id: string) => {

    let query = supabase
        .from('profiles')
        .select('*')
        .match({id: id})
        .limit(1)
        .single()

    return query;
}

export const createProfile: any = async (postProfileModel: PostProfileModel) => {
    const {data, error} = await supabase
        .from('profiles')
        .insert([postProfileModel])
        .single();

    return {data, error};
}

export const updateProfile: any = async (patchProfileModel: PatchProfileModel, id: string) => {
    const {data, error} = await supabase
        .from('profiles')
        .update(patchProfileModel)
        .match({id: id})
        .single();

    return {data, error};
}

export const deleteProfile: any = async (id: string) => {
    const {data, error} = await supabase
        .from('profiles')
        .delete()
        .match({id: id})

    return {data, error};
}
