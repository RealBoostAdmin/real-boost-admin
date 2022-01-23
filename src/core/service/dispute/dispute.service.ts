import {supabase} from '../../supabase/client';
import {DisputeModel, PatchDisputeModel, PostDisputeModel} from "../../models/dispute/dispute.model";

export const getDisputeOfMission: DisputeModel[] | any = async (missionId: string) => {
    const {data: dataConversation, error: errorConversation} = await supabase
        .from('disputes')
        .select('*')
        .match({mission_id: missionId})
        .order('created_at')
        .limit(1)

    return {dataConversation, errorConversation};
}

export const createDispute: any = async (postDisputeData: PostDisputeModel) => {
    const {data: dataDispute, error: errorDispute} = await supabase
        .from('disputes')
        .insert([postDisputeData])
        .single();

    return {dataDispute, errorDispute};
}

export const updateDispute: any = async (patchDisputeData: PatchDisputeModel, id: string) => {
    const {data, error} = await supabase
        .from('disputes')
        .update(patchDisputeData)
        .match({id: id})
        .single();

    return {data, error};
}

export const deleteDispute: any = async (id: string) => {
    const {data, error} = await supabase
        .from('disputes')
        .delete()
        .match({id: id})

    return {data, error};
}
