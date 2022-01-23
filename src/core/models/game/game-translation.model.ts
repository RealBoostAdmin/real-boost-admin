import {GameModel} from './game.model';
import {TranslationModel} from '../translation/translation.model';

export interface PostGameTranslationModel {
    description: string;
    translation_id: string;
    game_id: string;
}

export interface PatchGameTranslationModel {
    description?: string;
}

export interface GameTranslationModel {
    id: string;
    description: string;
    game: GameModel;
    translation: TranslationModel
    created_at: Date;
    updated_at: Date;
}
