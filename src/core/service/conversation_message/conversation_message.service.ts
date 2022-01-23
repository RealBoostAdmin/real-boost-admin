import {supabase} from '../../supabase/client';
import {
    ConversationMessageModel,
    PatchConversationMessageModel,
    PostConversationMessageModel
} from "../../models/conversation_message/conversation_message.model";

export const getMessagesOfConversation: ConversationMessageModel[] | any = async (conversationId: string) => {
    const {data: messagesOfConversation, error: errorMessagesOfConversation} = await supabase
        .from('_conversation_messages')
        .select('*')
        .match({conversation_id: conversationId, deleted: 0})
        .order('created_at')

    return {messagesOfConversation, errorMessagesOfConversation};
}

export const createConversationMessage: any = async (postConversationMessageData: PostConversationMessageModel) => {
    const {data, error} = await supabase
        .from('conversation_messages')
        .insert([postConversationMessageData])
        .single();

    return {data, error};
}

export const updateConversationMessage: any = async (patchConversationMessageData: PatchConversationMessageModel, id: string) => {
    const {data, error} = await supabase
        .from('conversation_messages')
        .update(patchConversationMessageData)
        .match({id: id})
        .single();

    return {data, error};
}

export const deleteConversationMessage: any = async (id: string) => {
    const {data, error} = await supabase
        .from('conversation_messages')
        .update({'deleted': 1})
        .match({id: id})
        .single();

    return {data, error};
}
