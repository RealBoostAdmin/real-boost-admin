import {FilterModel} from '../utils/filters/filter.model';
import {UserModel} from '../user/user.model';
import {BountyModel} from '../bounty/bounty.model';
import {BillModel} from '../bill/bill.model';
import {DisputeModel} from '../dispute/dispute.model';
import {ReviewModel} from '../review/review.model';
import {ConversationModel} from '../conversation/conversation.model';

export enum MissionState {
    OPEN = 'OPEN',
    ASSIGNED = 'ASSIGNED',
    ONGOING = 'ONGOING',
    DISPUTED = 'DISPUTED', // CASE WHEN CLIENT IS NOT HAPPY ABOUT THE ORDER AND CREATE A DISPUTE ETC...
    DONE = 'DONE',
    CLOSE = 'CLOSE'
}

export const missionStates: MissionState[] = [
    MissionState.OPEN,
    MissionState.ASSIGNED,
    MissionState.ONGOING,
    MissionState.DISPUTED,
    MissionState.DONE,
    MissionState.CLOSE
];

export interface PostMissionModel {
    code: string;
    state: MissionState
    currency: string;
    total: number;
    user_id: string;
}

export interface PatchMissionModel {
    state?: MissionState;
    currency?: string;
    total: number;
}

export interface MissionModel {
    id: string;
    code: string;
    state: MissionState;
    currency: string;
    total: number;
    user: UserModel;
    bounty: BountyModel;
    bills: BillModel[];
    review: ReviewModel;
    conversation: ConversationModel;
    dispute: DisputeModel
    created_at: Date;
    updated_at: Date;
}

export interface MissionFilterModel {
    username?: FilterModel[];
    state: FilterModel[];
    code?: FilterModel[];
}
