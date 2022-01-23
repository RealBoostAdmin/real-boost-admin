import {supabase} from '../../supabase/client';
import {
    DisputeMessageModel,
    PatchDisputeMessageModel,
    PostDisputeMessageModel
} from "../../models/dispute_message/dispute_message.model";

export const getMessagesOfDispute: DisputeMessageModel[] | any = async (disputeId: string) => {
    const {data: messagesOfDispute, error: errorMessagesOfDispute} = await supabase
        .from('_dispute_messages')
        .select('*')
        .match({dispute_id: disputeId, deleted: 0})
        .order('created_at')

    return {messagesOfDispute, errorMessagesOfDispute};
}

export const createDisputeMessage: any = async (postDisputeMessageData: PostDisputeMessageModel) => {
    const {data, error} = await supabase
        .from('dispute_messages')
        .insert([postDisputeMessageData])
        .single();

    return {data, error};
}

export const updateDisputeMessage: any = async (patchDisputeMessageData: PatchDisputeMessageModel, id: string) => {
    const {data, error} = await supabase
        .from('dispute_messages')
        .update(patchDisputeMessageData)
        .match({id: id})
        .single();

    return {data, error};
}

export const deleteDisputeMessage: any = async (id: string) => {
    const {data, error} = await supabase
        .from('dispute_messages')
        .delete()
        .match({id: id})

    return {data, error};
}
