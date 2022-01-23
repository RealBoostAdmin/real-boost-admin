import {supabase} from '../../supabase/client';
import {FilterEnabledModel} from '../../models/utils/filters/filterEnabled.model';
import {AddressModel, PatchAddressModel, PostAddressModel} from '../../models/address/address.model';
import {filtersHelper} from "../../helpers/filters/filters.helper";

export const getAddress: AddressModel | any = async (id: string) => {

    let query = supabase
        .from('addresses')
        .select('*')
        .match({id: id})
        .limit(1)
        .single()

    return query;
}

export const getAddresses: AddressModel[] | any = async (
    filtersEnabled?: FilterEnabledModel[] | null,
    currentPage: number = 1,
    search?: string | null,
    sort: string = 'firstname',
    limit: number | null = 10
) => {
    const startRange = (currentPage * limit) - limit;
    const endRange = currentPage * limit - 1;

    let query = supabase
        .from('_addresses')
        .select('*')
        .range(startRange, endRange)

    filtersEnabled && filtersEnabled.forEach((filterEnabled: FilterEnabledModel) => {
        query = filtersHelper(filterEnabled, query)
    });
    if (search) query.or(`firstname.ilike.%${search}%,lastname.ilike.%${search}%,address.ilike.%${search}%,zipcode.ilike.%${search}%,city.ilike.%${search}%,country.ilike.%${search}%`)

    query.order(sort)

    return query;
}

export const getCountAddresses = async (
    filtersEnabled?: FilterEnabledModel[] | null,
    search?: string | null,
) => {
    let query = supabase
        .from('_addresses')
        .select('firstname', {count: 'exact'})

    filtersEnabled && filtersEnabled.forEach((filterEnabled: FilterEnabledModel) => {
        query = filtersHelper(filterEnabled, query)
    });
    if (search) query.or(`firstname.ilike.%${search}%,lastname.ilike.%${search}%,address.ilike.%${search}%,zipcode.ilike.%${search}%,city.ilike.%${search}%,country.ilike.%${search}%`)

    return query;
}

export const createAddress: any = async (postAddressModel: PostAddressModel) => {
    console.log(postAddressModel);
    const {data, error} = await supabase
        .from('addresses')
        .insert([postAddressModel])
        .single();

    return {data, error};
}

export const updateAddress: any = async (patchAddressModel: PatchAddressModel, id: string) => {
    const {data, error} = await supabase
        .from('addresses')
        .update(patchAddressModel)
        .match({id: id})
        .single();

    return {data, error};
}

export const deleteAddress: any = async (id: string) => {
    const {data, error} = await supabase
        .from('addresses')
        .delete()
        .match({id: id})

    return {data, error};
}
