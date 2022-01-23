import {UserModel} from '../user/user.model';
import {ConversationModel} from '../conversation/conversation.model';

export interface PostConversationMessageModel {
    content: string;
    deleted: boolean;
    user_id: string;
    conversation_id: string;
}

export interface PatchConversationMessageModel {
    content?: string;
    deleted?: boolean;
}

export interface ConversationMessageModel {
    id: string;
    content: string;
    deleted: boolean;
    user: UserModel;
    conversation: ConversationModel;
    created_at: Date;
    updated_at: Date;
}
