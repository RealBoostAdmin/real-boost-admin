import {UserModel} from '../user/user.model';
import {DisputeModel} from '../dispute/dispute.model';

export interface PostDisputeMessageModel {
    content: string;
    deleted: boolean;
    user_id: string;
    dispute_id: string;
}

export interface PatchDisputeMessageModel {
    content?: string;
    deleted?: boolean;
}

export interface DisputeMessageModel {
    id: string;
    content: string;
    deleted: boolean;
    user: UserModel;
    dispute: DisputeModel;
    created_at: Date;
    updated_at: Date;
}
