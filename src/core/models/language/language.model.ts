import {TranslationModel} from '../translation/translation.model';
import {FilterModel} from '../utils/filters/filter.model';
import {CountryModel} from '../country/country.model';

export interface PostLanguageModel {
    name: string;
    translation_id: string;
    country_id: string;
}

export interface PatchLanguageModel {
    name?: string;
}

export interface LanguageModel {
    id: string;
    name: string;
    translation: TranslationModel;
    country: CountryModel;
    created_at: Date;
    updated_at: Date;
}

export interface LanguageFilterModel {
    translation: {
        code: FilterModel[];
    },
    country: {
        name: FilterModel[];
    }
}

export interface LanguageRelations {
    translation: TranslationModel;
    country: CountryModel;
}
