import {supabase} from '../../supabase/client';
import {
    PatchProfileTranslationModel,
    PostProfileTranslationModel,
    ProfileTranslationModel
} from "../../models/profile/profile-translation.model";

export const getProfileTranslation: ProfileTranslationModel | any = async (
    profileId: string,
    translationId: string
) => {
    const {data: dataTranslation, error: errorTranslation} = await supabase
        .from('profile_translations')
        .select(`*`)
        .match({profile_id: profileId, translation_id: translationId})
        .limit(1)

    return {dataTranslation, errorTranslation};
}

export const createProfileTranslation: any = async (
    {description}: PostProfileTranslationModel,
    translationId: string,
    profileId: string
) => {
    const {data: dataTranslation, error: errorTranslation} = await supabase
        .from('profile_translations')
        .insert([{description, translation_id: translationId, profile_id: profileId}])
        .single();

    return {dataTranslation, errorTranslation};
}

export const updateProfileTranslation: any = async (
    {description}: PatchProfileTranslationModel,
    profileTranslationId: string,
) => {
    const {data: dataTranslation, error: errorTranslation} = await supabase
        .from('profile_translations')
        .update({description})
        .match({id: profileTranslationId})
        .single();

    return {dataTranslation, errorTranslation};
}
