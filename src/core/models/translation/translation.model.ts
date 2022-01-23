import {LanguageModel} from '../language/language.model';

export interface PostTranslationModel {
    code: string;
    flag: string;
    languages?: LanguageModel[];
}

export interface PatchTranslationModel {
    code?: string;
    flag?: string;
    languages?: LanguageModel[];
}

export interface TranslationModel {
    id: string;
    code: string;
    flag: string;
    languages: LanguageModel[];
    created_at: Date;
    updated_at: Date;
}
