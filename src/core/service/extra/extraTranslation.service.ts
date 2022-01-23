import {supabase} from '../../supabase/client';
import {
    ExtraTranslationModel,
    PatchExtraTranslationModel,
    PostExtraTranslationModel
} from '../../models/extra/extra-translation.model';

export const getExtraTranslation: ExtraTranslationModel | any = async (
    extraId: string,
    translationId: string
) => {
    const {data: dataTranslation, error: errorTranslation} = await supabase
        .from('extra_translations')
        .select(`*`)
        .match({extra_id: extraId, translation_id: translationId})
        .limit(1)

    return {dataTranslation, errorTranslation};
}

export const createExtraTranslation: any = async (
    postExtra: PostExtraTranslationModel,
) => {
    const {data, error} = await supabase
        .from('extra_translations')
        .insert([postExtra])
        .single();

    return {data, error};
}

export const updateExtraTranslation: any = async (
    patchExtraData: PatchExtraTranslationModel,
    extraTranslationId: string,
) => {
    const {data, error} = await supabase
        .from('extra_translations')
        .update(patchExtraData)
        .match({id: extraTranslationId})
        .single();

    return {data, error};
}
