import {supabase} from '../../supabase/client';
import {FilterModel} from '../../models/utils/filters/filter.model';
import {FilterEnabledModel} from '../../models/utils/filters/filterEnabled.model';
import {ExtraFilterModel, ExtraModel, PatchExtraModel, PostExtraModel} from '../../models/extra/extra.model';
import {filtersHelper} from "../../helpers/filters/filters.helper";
import {OptionModel} from "../../models/option/option.model";

export const getExtra: ExtraModel | any = async (id: string) => {

    let query = supabase
        .from('extras')
        .select('*')
        .match({id: id})
        .limit(1)
        .single()

    return query;
}

export const getExtrasWithoutPagination: ExtraModel[] | any = async (
    sort: string = 'name',
) => {
    let query = supabase
        .from('extras')
        .select('*')

    query.order(sort)

    return query;
}

export const getExtras: ExtraModel[] | any = async (
    filtersEnabled?: FilterEnabledModel[] | null,
    currentPage: number = 1,
    search?: string | null,
    sort: string = 'name',
    limit: number | null = 10
) => {
    const startRange = (currentPage * limit) - limit;
    const endRange = currentPage * limit - 1;

    let query = supabase
        .from('extras')
        .select('*')
        .range(startRange, endRange)

    filtersEnabled && filtersEnabled.forEach((filterEnabled: FilterEnabledModel) => {
        query = filtersHelper(filterEnabled, query)
    });
    if (search) query.or(`name.ilike.%${search}%`)

    query.order(sort)

    return query;
}

export const getCountExtras = async (
    filtersEnabled?: FilterEnabledModel[] | null,
    search?: string | null,
) => {
    let query = supabase
        .from('extras')
        .select('name', {count: 'exact'})

    filtersEnabled && filtersEnabled.forEach((filterEnabled: FilterEnabledModel) => {
        query = filtersHelper(filterEnabled, query)
    });
    if (search) query.or(`name.ilike.%${search}%`)

    return query;
}

export const getFiltersExtra = async () => {
    const {data: extraData, error} = await supabase
        .from('extras')
        .select('name')

    const extrasName: FilterModel[] = [];

    extraData.forEach((item: any) => {
        extrasName.push({id: item.name, label: item.name})
    });

    const listValues: ExtraFilterModel = {
        name: extrasName,
    };

    return {listValues, error};
}

export const createExtra: any = async (postExtraData: PostExtraModel) => {
    const {data, error} = await supabase
        .from('extras')
        .insert([postExtraData])
        .single();

    return {data, error};
}

export const updateExtra: any = async (patchExtraData: PatchExtraModel, id: string) => {
    const {data, error} = await supabase
        .from('extras')
        .update(patchExtraData)
        .match({id: id})
        .single();

    return {data, error};
}

export const deleteExtra: any = async (id: string) => {
    const {data, error} = await supabase
        .from('extras')
        .delete()
        .match({id: id})

    return {data, error};
}
