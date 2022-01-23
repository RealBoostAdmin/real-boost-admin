import {supabase} from '../../supabase/client';
import {FilterModel} from '../../models/utils/filters/filter.model';
import {FilterEnabledModel} from '../../models/utils/filters/filterEnabled.model';
import {filtersHelper} from "../../helpers/filters/filters.helper";
import {DiscountModel, PatchDiscountModel, PostDiscountModel} from '../../models/discount/discount.model';

export const getDiscount: DiscountModel | any = async (id: string) => {

    let query = supabase
        .from('discounts')
        .select('*')
        .match({id: id})
        .limit(1)
        .single()

    return query;
}

export const getDiscountsWithoutPagination: DiscountModel[] | any = async (
    sort: string = 'created_at',
) => {
    let query = supabase
        .from('discounts')
        .select('*')

    query.order(sort)

    return query;
}

export const getDiscounts: DiscountModel[] | any = async (
    currentPage: number = 1,
    search?: string | null,
    sort: string = 'created_at',
    limit: number | null = 10
) => {
    const startRange = (currentPage * limit) - limit;
    const endRange = currentPage * limit - 1;

    let query = supabase
        .from('discounts')
        .select('*')
        .range(startRange, endRange)

    if (search) query.or(`code.ilike.%${search}%`)

    query.order('code')

    return query;
}

export const getCountDiscounts = async (
    search?: string | null,
) => {
    let query = supabase
        .from('discounts')
        .select('code', {count: 'exact'})

    if (search) query.or(`code.ilike.%${search}%`)

    return query;
}

export const createDiscount: any = async (postDiscountData: PostDiscountModel) => {
    const {data, error} = await supabase
        .from('discounts')
        .insert([postDiscountData])
        .single();

    return {data, error};
}

export const updateDiscount: any = async (patchDiscountData: PatchDiscountModel, id: string) => {
    const {data, error} = await supabase
        .from('discounts')
        .update(patchDiscountData)
        .match({id: id})
        .single();

    return {data, error};
}

export const deleteDiscount: any = async (id: string) => {
    const {data, error} = await supabase
        .from('discounts')
        .delete()
        .match({id: id})

    return {data, error};
}
