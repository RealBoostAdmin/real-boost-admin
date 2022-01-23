export interface PostGameProfileModel {
    game_id: string;
    profile_id: string;
}

export interface GameProfileModel {
    id: string;
    game_id: string;
    profile_id: string;
    created_at: Date;
    updated_at: Date;
}
