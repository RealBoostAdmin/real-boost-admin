import {TranslationModel} from '../translation/translation.model';
import {ExtraModel} from './extra.model';

export interface PostExtraTranslationModel {
    name: string;
    translation_id: string;
    extra_id: string;
}

export interface PatchExtraTranslationModel {
    name?: string;
}

export interface ExtraTranslationModel {
    id: string;
    name: string;
    extra: ExtraModel;
    translation: TranslationModel
    created_at: Date;
    updated_at: Date;
}
