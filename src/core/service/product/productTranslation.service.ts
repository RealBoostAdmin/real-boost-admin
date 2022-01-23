import {supabase} from '../../supabase/client';
import {
    PatchProductTranslationModel,
    PostProductTranslationModel,
    ProductTranslationModel
} from '../../models/product/product-translation.model';

export const getProductTranslation: ProductTranslationModel | any = async (
    productId: string,
    translationId: string
) => {
    const {data: dataTranslation, error: errorTranslation} = await supabase
        .from('product_translations')
        .select(`*`)
        .match({product_id: productId, translation_id: translationId})
        .limit(1)

    return {dataTranslation, errorTranslation};
}

export const createProductTranslation: any = async (postProductTranslation: PostProductTranslationModel) => {
    const {data, error} = await supabase
        .from('product_translations')
        .insert([postProductTranslation])
        .single();

    return {data, error};
}

export const updateProductTranslation: any = async (
    patchProductData: PatchProductTranslationModel,
    productTranslationId: string,
) => {
    const {data, error} = await supabase
        .from('product_translations')
        .update(patchProductData)
        .match({id: productTranslationId})
        .single();

    return {data, error};
}
