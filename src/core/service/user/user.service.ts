import {supabase} from '../../supabase/client';
import {FilterEnabledModel} from '../../models/utils/filters/filterEnabled.model';
import {PatchUserModel, PostUserModel, UserModel} from "../../models/user/user.model";
import {FilterType} from "../../models/utils/enums/filter-type";

export const getUser: UserModel | any = async (id: string) => {

    let query = supabase
        .from('_users')
        .select('*')
        .match({id: id})
        .limit(1)
        .single()

    return query;
}

export const getUserByUsername: UserModel | any = async (username: string) => {

    const {data: user, error: errorUser} = await supabase
        .from('_users')
        .select('*')
        .match({username: username})
        .limit(1)

    return {user, errorUser};
}

export const getUserByEmail: UserModel | any = async (email: string) => {

    const {data: user, error: errorUser} = await supabase
        .from('users')
        .select('*')
        .match({email: email})
        .limit(1)

    return {user, errorUser};
}

export const getUsers: UserModel[] | any = async (
    filtersEnabled?: FilterEnabledModel[] | null,
    currentPage: number = 1,
    search?: string | null,
    sort: string = 'email',
    limit: number | null = 10
) => {
    const startRange = (currentPage * limit) - limit;
    const endRange = currentPage * limit - 1;

    let query = supabase
        .from('_users')
        .select('*')
        .range(startRange, endRange)

    filtersEnabled && filtersEnabled.forEach((filter: FilterEnabledModel) => {
        filter.type === FilterType.Multiple
            ? query = query.in(filter.key, [filter.value.map((val: any) => val.value)])
            : query = query.ilike(filter.key, `%${filter.value}%`);
    })

    if (search) {
        query.or(`username.ilike.%${search}%,email.ilike.%${search}%`)
    }
    query.order(sort)

    return query;
}

export const getCountUsers = async (
    filtersEnabled?: FilterEnabledModel[] | null,
    search?: string | null,
) => {
    let query = supabase
        .from('_users')
        .select('email', {count: 'exact'})

    filtersEnabled && filtersEnabled.forEach((filter: FilterEnabledModel) => {
        filter.type === FilterType.Multiple
            ? query = query.in(filter.key, [filter.value.map((val: any) => val.value)])
            : query = query.ilike(filter.key, `%${filter.value}%`);
    })

    if (search) {
        query.or(`username.ilike.%${search}%,email.ilike.%${search}%`)
    }

    return query;
}

export const createUser: any = async (postUserData: PostUserModel) => {
    const {data, error} = await supabase
        .from('users')
        .insert([postUserData])
        .single();

    return {data, error};
}

export const updateUser: any = async (patchUserData: PatchUserModel, id: string) => {
    const {data, error} = await supabase
        .from('users')
        .update(patchUserData)
        .match({id: id})
        .single();

    return {data, error};
}

export const deleteUser: any = async (id: string) => {
    const {data, error} = await supabase
        .from('users')
        .delete()
        .match({id: id})

    return {data, error};
}
