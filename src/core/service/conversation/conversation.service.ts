import {supabase} from '../../supabase/client';
import {
    ConversationModel,
    PatchConversationModel,
    PostConversationModel
} from "../../models/conversation/conversation.model";

export const getConversationOfMission: ConversationModel[] | any = async (missionId: string) => {
    const {data: dataConversation, error: errorConversation} = await supabase
        .from('conversations')
        .select('*')
        .match({mission_id: missionId})
        .order('created_at')
        .limit(1)

    return {dataConversation, errorConversation};
}

export const createConversation: any = async (postConversationData: PostConversationModel) => {
    const {data: dataConversation, error: errorConversation} = await supabase
        .from('conversations')
        .insert([postConversationData])
        .single();

    return {dataConversation, errorConversation};
}

export const updateConversation: any = async (patchConversationData: PatchConversationModel, id: string) => {
    const {data: dataConversation, error: errorConversation} = await supabase
        .from('conversations')
        .update(patchConversationData)
        .match({id: id})
        .single();

    return {dataConversation, errorConversation};
}

export const updateConversationOfMission: any = async (patchConversationData: PatchConversationModel, missionId: string) => {
    const {data, error} = await supabase
        .from('conversations')
        .update(patchConversationData)
        .match({mission_id: missionId})
        .single();

    return {data, error};
}

export const deleteConversation: any = async (id: string) => {
    const {data, error} = await supabase
        .from('conversations')
        .delete()
        .match({id: id})

    return {data, error};
}
