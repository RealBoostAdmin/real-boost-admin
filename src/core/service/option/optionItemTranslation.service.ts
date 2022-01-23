import {supabase} from '../../supabase/client';
import {
    OptionItemTranslationModel,
    PatchOptionItemTranslationModel,
    PostOptionItemTranslationModel
} from '../../models/option/option-item-translation.model';

export const getOptionItemTranslation: OptionItemTranslationModel | any = async (
    optionItemId: string,
    translationId: string
) => {
    const {data: dataTranslation, error: errorTranslation} = await supabase
        .from('option_item_translations')
        .select(`*`)
        .match({option_item_id: optionItemId, translation_id: translationId})
        .limit(1)

    return {dataTranslation, errorTranslation};
}

export const createOptionItemTranslation: any = async (postOptionItemTranslation: PostOptionItemTranslationModel) => {
    const {data, error} = await supabase
        .from('option_item_translations')
        .insert([postOptionItemTranslation])
        .single();

    return {data, error};
}

export const updateOptionItemTranslation: any = async (
    patchOptionItemTranslationData: PatchOptionItemTranslationModel,
    optionItemTranslationId: string,
) => {
    const {data, error} = await supabase
        .from('option_item_translations')
        .update(patchOptionItemTranslationData)
        .match({id: optionItemTranslationId})
        .single();

    return {data, error};
}
