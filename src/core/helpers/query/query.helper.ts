import {supabase} from '../../supabase/client';

export const createModelHelper: any = async (table: string, postData: any) => {
    const {data, error} = await supabase
        .from(table)
        .insert([postData])
        .single();

    return {data, error};
}

export const updateModelHelper: any = async (table: string, patchData: any, id: string) => {
    const {data, error} = await supabase
        .from(table)
        .update(patchData)
        .match({id: id})
        .single();

    return {data, error};
}

export const deleteModelHelper: any = async (table: string, id: string) => {
    const {data, error} = await supabase
        .from(table)
        .delete()
        .match({id: id})

    return {data, error};
}
