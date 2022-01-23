import {MissionModel} from '../mission/mission.model';
import {ConversationMessageModel} from '../conversation_message/conversation_message.model';

export enum DisputeState {
    OPEN = 'OPEN',
    PENDING = 'PENDING',
    CLOSE = 'CLOSE'
}

export interface PostDisputeModel {
    state: DisputeState;
    mission_id: string;
}

export interface PatchDisputeModel {
    state?: DisputeState;
}

export interface DisputeModel {
    id: string;
    state: DisputeState;
    mission: MissionModel;
    messages: ConversationMessageModel[];
    created_at: Date;
    updated_at: Date;
}
