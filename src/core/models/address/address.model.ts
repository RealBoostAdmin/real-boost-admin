import {FilterModel} from '../utils/filters/filter.model';
import {UserModel} from '../user/user.model';

export interface PostAddressModel {
    firstname: string;
    lastname: string;
    address: string;
    zipcode: string;
    city: string;
    country: string;
    user_id: string;
}

export interface PatchAddressModel {
    firstname?: string;
    lastname?: string;
    address?: string;
    zipcode?: string;
    city?: string;
    country?: string;
    user_id?: string;
}

export interface AddressModel {
    id: string;
    firstname: string;
    lastname: string;
    address: string;
    zipcode: string;
    city: string;
    country: string;
    user: UserModel;
    created_at: Date;
    updated_at: Date;
}

export interface AddressFilterModel {
    firstname: FilterModel[];
    lastname: FilterModel[];
    email: FilterModel[];
    username: FilterModel[];
}
