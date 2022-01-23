import {supabase} from '../../supabase/client';
import {
    GameTranslationModel,
    PatchGameTranslationModel,
    PostGameTranslationModel
} from '../../models/game/game-translation.model';

export const getGameTranslation: GameTranslationModel | any = async (
    gameId: string,
    translationId: string
) => {
    const {data: dataTranslation, error: errorTranslation} = await supabase
        .from('game_translations')
        .select(`*`)
        .match({game_id: gameId, translation_id: translationId})
        .limit(1)

    return {dataTranslation, errorTranslation};
}

export const createGameTranslation: any = async (
    {description}: PostGameTranslationModel,
    translationId: string,
    gameId: string
) => {
    const {data: dataTranslation, error: errorTranslation} = await supabase
        .from('game_translations')
        .insert([{description, translation_id: translationId, game_id: gameId}])
        .single();

    return {dataTranslation, errorTranslation};
}

export const updateGameTranslation: any = async (
    {description}: PatchGameTranslationModel,
    gameTranslationId: string,
) => {
    const {data: dataTranslation, error: errorTranslation} = await supabase
        .from('game_translations')
        .update({description})
        .match({id: gameTranslationId})
        .single();

    return {dataTranslation, errorTranslation};
}
