import {supabase} from '../../supabase/client';
import {FilterEnabledModel} from 'core/models/utils/filters/filterEnabled.model';
import {FilterModel} from '../../models/utils/filters/filter.model';
import {
    LanguageFilterModel,
    LanguageModel,
    LanguageRelations,
    PatchLanguageModel,
    PostLanguageModel
} from '../../models/language/language.model';
import {filtersHelper} from "../../helpers/filters/filters.helper";

export const getLanguages: LanguageModel[] | any = async (
    filtersEnabled?: FilterEnabledModel[] | null,
    currentPage: number = 1,
    search?: string | null,
    sort: string = 'created_at',
    limit: number | null = 3
) => {
    const startRange = (currentPage * limit) - limit;
    const endRange = currentPage * limit - 1;

    let query = supabase
        .from('_languages')
        .select('*')
        .range(startRange, endRange)

    filtersEnabled && filtersEnabled.forEach((filterEnabled: FilterEnabledModel) => {
        query = filtersHelper(filterEnabled, query)
    });
    if (search) query.or(`name.ilike.%${search}%,translation->>code.ilike.%${search}%`)

    if (sort) query = query.order(sort, {ascending: false})

    return query;
}

export const getFiltersLanguage = async () => {
    let queryTranslations = await supabase
        .from('translations')
        .select('code')

    let queryCountries = await supabase
        .from('countries')
        .select('name')

    let error: any = queryTranslations.error
        ? queryTranslations.error
        : queryCountries.error
            ? queryCountries.error
            : null;

    const listTranslationCode: FilterModel[] = [];
    const listCountry: FilterModel[] = [];

    queryTranslations.data.forEach((item: any) => {
        listTranslationCode.push({id: item.code, label: item.code})
    });
    queryCountries.data.forEach((item: any) => {
        listCountry.push({id: item.name, label: item.name})
    });

    const listValues: LanguageFilterModel = {
        translation: {
            code: listTranslationCode,
        },
        country: {
            name: listCountry,
        }
    };

    return {listValues, error};
}

export const getCountLanguages = async (
    filtersEnabled?: FilterEnabledModel[] | null,
    search?: string | null,
) => {
    let query = supabase
        .from('_languages')
        .select('name', {count: 'exact'})

    filtersEnabled && filtersEnabled.forEach((filterEnabled: FilterEnabledModel) => {
        query = filtersHelper(filterEnabled, query)
    });
    if (search) query.or(`name.ilike.%${search}%,translation->>code.ilike.%${search}%`)

    return query;
}

export const createLanguage: any = async ({name, translation_id, country_id}: PostLanguageModel) => {
    const {data, error} = await supabase
        .from('languages')
        .insert([{
            name,
            translation_id,
            country_id
        }])

    return {data, error};
}

export const updateLanguage: any = async ({name}: PatchLanguageModel, relations: LanguageRelations) => {
    const {data, error} = await supabase
        .from('languages')
        .update({name})
        .eq('translation_id', relations.translation.id)
        .eq('country_id', relations.country.id)

    return {data, error};
}

export const deleteLanguage: any = async (id: string) => {
    const {data, error} = await supabase
        .from('languages')
        .delete()
        .match({id: id})

    return {data, error};
}
