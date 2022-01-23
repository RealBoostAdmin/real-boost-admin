import {MissionModel} from '../mission/mission.model';

export interface PostReviewModel {
    content: string
    rating: number;
    mission_id: string;
}

export interface PatchReviewModel {
    content?: string;
    rating?: number;
}

export interface ReviewModel {
    id: string;
    content: string;
    rating: number;
    mission: MissionModel;
    created_at: Date;
    updated_at: Date;
}
