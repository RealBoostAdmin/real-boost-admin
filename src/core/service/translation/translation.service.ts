import {PatchTranslationModel, PostTranslationModel, TranslationModel} from '../../models/translation/translation.model';
import {supabase} from '../../supabase/client';

export const getTranslations: TranslationModel[] | any = async () => {

    let query = supabase
        .from('translations')
        .select('*')

    return query;
}

export const createTranslation: any = async ({code, flag}: PostTranslationModel) => {
    const {data, error} = await supabase
        .from('translations')
        .insert([{code, flag}])

    return {data, error};
}

export const updateTranslation: any = async (patchTranslation: PatchTranslationModel, id: string) => {
    const {data, error} = await supabase
        .from('translations')
        .update(patchTranslation)
        .eq('id', id)

    return {data, error};
}

export const deleteTranslation: any = async (id: string) => {
    const {data, error} = await supabase
        .from('translations')
        .delete()
        .match({ id: id })

    return {data, error};
}
