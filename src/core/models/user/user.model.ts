import {TranslationModel} from '../translation/translation.model';
import {ProfileModel} from '../profile/profile.model';
import {AddressModel} from '../address/address.model';
import {FilterModel} from '../utils/filters/filter.model';

export enum Role {
    SUPER_ADMIN = 'SUPER_ADMIN',
    ADMIN = 'ADMIN',
    BOOSTER = 'BOOSTER',
    USER = 'USER'
}

export const roles: Role[] = [Role.USER, Role.BOOSTER, Role.ADMIN, Role.SUPER_ADMIN];

export interface PostUserModel {
    username: string;
    email: string;
    avatar_url?: string;
    role: Role;
    translation_id?: string;
}

export interface PatchUserModel {
    username?: string;
    email?: string;
    avatar_url?: string;
    role?: Role;
    translation_id?: string;
}

export interface UserModel {
    id: string;
    username: string;
    email: string;
    avatar_url?: string;
    role: Role;
    translation?: TranslationModel;
    profile?: ProfileModel;
    address?: AddressModel;
    created_at: Date;
    updated_at: Date;
}

export interface UserFilterModel {
    email?: FilterModel[];
    username?: FilterModel[];
}
