import {supabase} from '../../supabase/client';
import {OptionModel} from '../../models/option/option.model';
import {PostOptionProductModel} from '../../models/option_product/option_product';

export const getOptionsOfProduct: OptionModel[] | any = async (productId: string) => {

    let query = supabase
        .from('_options_products')
        .select('*')
        .eq('option_product->>product_id', productId)

    return query;
}

export const getOptionProduct: OptionModel | any = async (optionId: string, productId: string) => {

    let query = supabase
        .from('options_products')
        .select('*')
        .match({option_id: optionId, product_id: productId})
        .limit(1)

    return query;
}

export const createOptionProduct: any = async (postOptionData: PostOptionProductModel) => {
    const {data, error: errorOptionProduct} = await supabase
        .from('options_products')
        .insert([postOptionData])
        .single();

    return {data, errorOptionProduct};
}

export const deleteOptionProduct: any = async (id: string) => {
    const {data, error} = await supabase
        .from('options_products')
        .delete()
        .match({id: id})

    return {data, error};
}
