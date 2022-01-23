import {supabase} from '../../supabase/client';
import {GameProfileModel, PostGameProfileModel} from "../../models/game_profile/game_profile";

export const getGamesOfProfile: GameProfileModel[] | any = async (profileId: string) => {

    let query = supabase
        .from('_games_profiles')
        .select('*')
        .eq('game_profile->>profile_id', profileId)

    return query;
}

export const getGameProfile: GameProfileModel | any = async (gameId: string, profileId: string) => {

    let query = supabase
        .from('games_profiles')
        .select('*')
        .match({game_id: gameId, profile_id: profileId})
        .limit(1)

    return query;
}

export const createGameProfile: any = async (postGameProfileData: PostGameProfileModel) => {
    const {data, error: errorGameProfile} = await supabase
        .from('games_profiles')
        .insert([postGameProfileData])
        .single();

    return {data, errorGameProfile};
}

export const deleteGameProfile: any = async (id: string) => {
    const {data, error} = await supabase
        .from('games_profiles')
        .delete()
        .match({id: id})

    return {data, error};
}
