import {supabase} from '../../supabase/client';
import {OptionItemModel, PatchOptionItemModel, PostOptionItemModel} from '../../models/option/option-item.model';

export const getOptionItem: OptionItemModel | any = async (id: string) => {

    let query = supabase
        .from('option_items')
        .select('*')
        .match({id: id})
        .limit(1)
        .single()

    return query;
}

export const getOptionItems: OptionItemModel[] | any = async (optionId: string) => {
    let query = supabase
        .from('option_items')
        .select('*')
        .match({option_id: optionId})
        .order('created_at')

    return query;
}

export const createOptionItem: any = async (postOptionItemData: PostOptionItemModel) => {
    console.log(postOptionItemData);
    const {data, error} = await supabase
        .from('option_items')
        .insert([postOptionItemData])
        .single();

    return {data, error};
}

export const updateOptionItem: any = async (patchOptionItemData: PatchOptionItemModel, id: string) => {
    const {data, error} = await supabase
        .from('option_items')
        .update(patchOptionItemData)
        .match({id: id})
        .single();

    return {data, error};
}

export const deleteOptionItem: any = async (id: string) => {
    const {data, error} = await supabase
        .from('option_items')
        .delete()
        .match({id: id})

    return {data, error};
}
