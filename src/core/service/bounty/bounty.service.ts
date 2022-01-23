import {supabase} from '../../supabase/client';
import {PatchBountyModel, PostBountyModel} from "../../models/bounty/bounty.model";

export const createBounty: any = async (postBountyData: PostBountyModel) => {
    const {data, error} = await supabase
        .from('bounties')
        .insert([postBountyData])
        .single();

    return {data, error};
}

export const updateBounty: any = async (patchBountyData: PatchBountyModel, id: string) => {
    const {data, error} = await supabase
        .from('bounties')
        .update(patchBountyData)
        .match({id: id})
        .single();

    return {data, error};
}

export const deleteBounty: any = async (id: string) => {
    const {data, error} = await supabase
        .from('bounties')
        .delete()
        .match({id: id})

    return {data, error};
}
