import {ProfileTranslationModel} from './profile-translation.model';
import {UserModel} from '../user/user.model';
import {ProfileMissionModel} from '../mission_profile/profile_mission';

export interface PostProfileModel {
    currency: string
    user: any;
}

export interface PatchProfileModel {
    currency?: string
    user?: any;
}

export interface ProfileModel {
    id: string;
    currency?: string
    user?: UserModel;
    profile_mission?: ProfileMissionModel;
    profileTranslations?: ProfileTranslationModel[] | null;
    created_at: Date;
    updated_at: Date;
}
