import {TranslationModel} from '../translation/translation.model';
import {OptionItemModel} from './option-item.model';

export interface PostOptionItemTranslationModel {
    label: string;
    translation_id: string;
    option_item_id: string;
}

export interface PatchOptionItemTranslationModel {
    label?: string;
}

export interface OptionItemTranslationModel {
    id: string;
    label: string;
    optionItem: OptionItemModel;
    translation: TranslationModel
    created_at: Date;
    updated_at: Date;
}
