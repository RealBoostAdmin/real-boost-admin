import {FilterModel} from '../utils/filters/filter.model';
import {OptionTranslationModel} from './option-translation.model';
import {OptionItemModel} from './option-item.model';
import {ProductModel} from '../product/product.model';
import {OrderModel} from '../order/order.model';

export interface PostOptionModel {
    name: string;
    multiple: boolean
}

export interface PatchOptionModel {
    name?: string;
    multiple?: boolean
}

export interface OptionModel {
    id: string;
    name: string;
    multiple: boolean;
    optionItems?: OptionItemModel[] | [];
    optionTranslations?: OptionTranslationModel[] | [];
    products?: ProductModel[] | [];
    orders?: OrderModel[] | [];
    created_at: Date;
    updated_at: Date;
}

export interface OptionFilterModel {
    name: FilterModel[];
}
