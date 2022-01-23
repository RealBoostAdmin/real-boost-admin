import {TranslationModel} from '../translation/translation.model';
import {ProfileModel} from './profile.model';

export interface PostProfileTranslationModel {
    description: string;
    translation_id: string;
    profile_id: string;
}

export interface PatchProfileTranslationModel {
    description?: string;
}

export interface ProfileTranslationModel {
    id: string;
    description: string;
    profile: ProfileModel;
    translation: TranslationModel
    created_at: Date;
    updated_at: Date;
}
