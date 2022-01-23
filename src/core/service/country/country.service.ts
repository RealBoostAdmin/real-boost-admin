import {supabase} from '../../supabase/client';
import {CountryModel, PatchCountryModel, PostCountryModel} from '../../models/country/country.model';

export const getCountries: CountryModel[] | any = async () => {

    let query = supabase
        .from('countries')
        .select('*')

    return query;
}

export const createCountry: any = async ({name}: PostCountryModel) => {
    const {data, error} = await supabase
        .from('countries')
        .insert([{name}])

    return {data, error};
}

export const updateCountry: any = async (patchCountry: PatchCountryModel, id: number) => {
    const {data, error} = await supabase
        .from('countries')
        .update(patchCountry)
        .eq('id', id)

    return {data, error};
}

export const deleteCountry: any = async (id: string) => {
    const {data, error} = await supabase
        .from('countries')
        .delete()
        .match({ id: id })

    return {data, error};
}
