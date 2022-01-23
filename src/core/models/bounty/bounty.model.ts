import {MissionModel} from '../mission/mission.model';

export interface PostBountyModel {
    amount?: number;
    percent?: number;
    mission_id: string;
}

export interface PatchBountyModel {
    amount?: number;
    percent?: number;
}

export interface BountyModel {
    id: string;
    amount?: number;
    percent?: number;
    mission: MissionModel;
    created_at: Date;
    updated_at: Date;
}
