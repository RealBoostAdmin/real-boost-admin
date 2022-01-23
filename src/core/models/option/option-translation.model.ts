import {TranslationModel} from '../translation/translation.model';
import {OptionModel} from './option.model';

export interface PostOptionTranslationModel {
    name: string;
    translation_id: string;
    option_id: string;
}

export interface PatchOptionTranslationModel {
    name?: string;
}

export interface OptionTranslationModel {
    id: string;
    name: string;
    option: OptionModel;
    translation: TranslationModel
    created_at: Date;
    updated_at: Date;
}
