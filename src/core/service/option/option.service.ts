import {supabase} from '../../supabase/client';
import {FilterModel} from '../../models/utils/filters/filter.model';
import {FilterEnabledModel} from '../../models/utils/filters/filterEnabled.model';
import {OptionFilterModel, OptionModel, PatchOptionModel, PostOptionModel} from '../../models/option/option.model';
import {QuestionModel} from '../../models/question/question.model';
import {filtersHelper} from "../../helpers/filters/filters.helper";

export const getOption: OptionModel | any = async (id: string) => {

    let query = supabase
        .from('options')
        .select('*')
        .match({id: id})
        .limit(1)
        .single()

    return query;
}

export const getOptionsWithoutPagination: OptionModel[] | any = async (
    sort: string = 'name',
) => {
    let query = supabase
        .from('options')
        .select('*')

    query.order(sort)

    return query;
}

export const getOptions: OptionModel[] | any = async (
    filtersEnabled?: FilterEnabledModel[] | null,
    currentPage: number = 1,
    search?: string | null,
    sort: string = 'name',
    limit: number | null = 10
) => {
    const startRange = (currentPage * limit) - limit;
    const endRange = currentPage * limit - 1;

    let query = supabase
        .from('options')
        .select('*')
        .range(startRange, endRange)

    filtersEnabled && filtersEnabled.forEach((filterEnabled: FilterEnabledModel) => {
        query = filtersHelper(filterEnabled, query)
    });
    if (search) query.or(`name.ilike.%${search}%`)

    query.order(sort)

    return query;
}

export const getCountOptions = async (
    filtersEnabled?: FilterEnabledModel[] | null,
    search?: string | null,
) => {
    let query = supabase
        .from('options')
        .select('name', {count: 'exact'})

    filtersEnabled && filtersEnabled.forEach((filterEnabled: FilterEnabledModel) => {
        query = filtersHelper(filterEnabled, query)
    });
    if (search) query.or(`name.ilike.%${search}%`)

    return query;
}

export const getFiltersOption = async () => {
    const {data: optionDatas, error} = await supabase
        .from('options')
        .select('name')

    const optionsName: FilterModel[] = [];

    optionDatas.forEach((item: any) => {
        optionsName.push({id: item.name, label: item.name})
    });

    const listValues: OptionFilterModel = {
        name: optionsName,
    };

    return {listValues, error};
}

export const createOption: any = async (postOptionData: PostOptionModel) => {
    const {data, error} = await supabase
        .from('options')
        .insert([postOptionData])
        .single();

    return {data, error};
}

export const updateOption: any = async (patchOptionData: PatchOptionModel, id: string) => {
    const {data, error} = await supabase
        .from('options')
        .update(patchOptionData)
        .match({id: id})
        .single();

    return {data, error};
}

export const deleteOption: any = async (id: string) => {
    const {data, error} = await supabase
        .from('options')
        .delete()
        .match({id: id})

    return {data, error};
}
