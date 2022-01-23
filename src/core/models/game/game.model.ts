import {GameTranslationModel} from './game-translation.model';
import {FilterModel} from '../utils/filters/filter.model';

export interface PostGameModel {
    name: string;
    image_url: string
}

export interface PatchGameModel {
    name?: string;
    image_url?: string
}

export interface GameModel {
    id: string;
    name: string;
    image_url: string;
    gameTranslations?: GameTranslationModel[] | null;
    created_at: Date;
    updated_at: Date;
}

export interface GameFilterModel {
    name: FilterModel[];
}
