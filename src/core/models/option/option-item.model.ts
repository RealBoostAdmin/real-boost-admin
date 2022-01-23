import {OptionModel} from './option.model';
import {OptionItemTranslationModel} from './option-item-translation.model';

export interface PostOptionItemModel {
    name: string;
    amount?: string;
    percent?: boolean;
    option_id: string;
}

export interface PatchOptionItemModel {
    name?: string;
    amount?: string;
    percent?: boolean;
}

export interface OptionItemModel {
    id: string;
    name: string;
    amount?: string | null;
    percent?: boolean | null;
    option: OptionModel;
    optionItemTranslations?: OptionItemTranslationModel[] | null;
    created_at: Date;
    updated_at: Date;
}
