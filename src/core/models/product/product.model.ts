import {GameModel} from '../game/game.model';
import {FilterModel} from '../utils/filters/filter.model';
import {ProductTranslationModel} from './product-translation.model';
import {OptionModel} from '../option/option.model';

export interface PostProductModel {
    name: string;
    rules?: string;
    game_id: string;
}

export interface PatchProductModel {
    name?: string;
    rules?: string;
    game_id?: string;
}

export interface ProductModel {
    id: string;
    name: string;
    rules?: string | null;
    game: GameModel
    productTranslations: ProductTranslationModel[];
    options?: OptionModel[] | [];
    created_at: Date;
    updated_at: Date;
}

export interface ProductFilterModel {
    game: FilterModel[];
}

