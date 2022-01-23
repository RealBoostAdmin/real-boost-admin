import {TranslationModel} from '../translation/translation.model';
import {ProductModel} from './product.model';

export interface PostProductTranslationModel {
    name: string;
    description?: string;
    translation_id: string;
    product_id: string;
}

export interface PatchProductTranslationModel {
    name?: string;
    description?: string;
}

export interface ProductTranslationModel {
    id: string;
    name: string;
    description?: string | null;
    product: ProductModel;
    translation: TranslationModel
    created_at: Date;
    updated_at: Date;
}
