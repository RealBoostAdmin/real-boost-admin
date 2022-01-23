import {FilterModel} from '../utils/filters/filter.model';
import {ExtraTranslationModel} from './extra-translation.model';

export interface ExtraModel {
    id: string;
    name: string;
    amount?: number;
    percent?: number;
    extraTranslations?: ExtraTranslationModel[] | null;
    created_at: Date;
    updated_at: Date;
}

export interface PostExtraModel {
    name: string;
    amount?: number;
    percent?: number;
}

export interface PatchExtraModel {
    name?: string;
    amount?: number;
    percent?: number;
}

export interface ExtraFilterModel {
    name: FilterModel[];
}
