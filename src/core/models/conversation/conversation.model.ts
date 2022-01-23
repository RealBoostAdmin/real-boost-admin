import {MissionModel} from '../mission/mission.model';
import {ConversationMessageModel} from '../conversation_message/conversation_message.model';

export enum ConversationState {
    OPEN = 'OPEN',
    PENDING = 'PENDING',
    CLOSE = 'CLOSE'
}

export interface PostConversationModel {
    state: ConversationState;
    mission_id: string;
}

export interface PatchConversationModel {
    state?: ConversationState;
}

export interface ConversationModel {
    id: string;
    state: ConversationState;
    mission: MissionModel;
    messages: ConversationMessageModel[];
    created_at: Date;
    updated_at: Date;
}
