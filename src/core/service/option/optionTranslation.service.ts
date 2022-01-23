import {supabase} from '../../supabase/client';
import {
    OptionTranslationModel,
    PatchOptionTranslationModel,
    PostOptionTranslationModel
} from '../../models/option/option-translation.model';

export const getOptionTranslation: OptionTranslationModel | any = async (
    optionId: string,
    translationId: string
) => {
    const {data: dataTranslation, error: errorTranslation} = await supabase
        .from('option_translations')
        .select(`*`)
        .match({option_id: optionId, translation_id: translationId})
        .limit(1)

    return {dataTranslation, errorTranslation};
}

export const createOptionTranslation: any = async (
    postOptionTranslation: PostOptionTranslationModel,
) => {
    const {data, error} = await supabase
        .from('option_translations')
        .insert([postOptionTranslation])
        .single();

    return {data, error};
}

export const updateOptionTranslation: any = async (
    patchOptionTranslationData: PatchOptionTranslationModel,
    optionTranslationId: string,
) => {
    const {data, error} = await supabase
        .from('option_translations')
        .update(patchOptionTranslationData)
        .match({id: optionTranslationId})
        .single();

    return {data, error};
}
