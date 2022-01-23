export interface PostProfileMissionModel {
    part: number;
    mission_id: string;
    profile_id: string;
}

export interface PutProfileMissionModel {
    part?: number;
}

export interface ProfileMissionModel {
    id: string;
    part: number;
    mission_id: string;
    profile_id: string;
    created_at: Date;
    updated_at: Date;
}
