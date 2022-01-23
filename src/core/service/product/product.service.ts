import {supabase} from '../../supabase/client';
import {FilterModel} from '../../models/utils/filters/filter.model';
import {FilterEnabledModel} from '../../models/utils/filters/filterEnabled.model';
import {
    PatchProductModel,
    PostProductModel,
    ProductFilterModel,
    ProductModel
} from '../../models/product/product.model';
import {filtersHelper} from "../../helpers/filters/filters.helper";

export const getProduct: ProductModel | any = async (name: string) => {

    let query = await supabase
        .from('_products')
        .select('*')
        .match({name: name})
        .limit(1)
        .single()

    return query;
}

export const getProducts: ProductModel[] | any = async (
    filtersEnabled?: FilterEnabledModel[] | null,
    currentPage: number = 1,
    search?: string | null,
    sort: string = 'name',
    limit: number | null = 10
) => {
    const startRange = (currentPage * limit) - limit;
    const endRange = currentPage * limit - 1;

    let query = supabase
        .from('_products')
        .select('*')
        .range(startRange, endRange)

    filtersEnabled && filtersEnabled.forEach((filterEnabled: FilterEnabledModel) => {
        query = filtersHelper(filterEnabled, query)
    });
    if (search) query.or(`game->>name.ilike.%${search}%`)

    query.order(sort)

    return query;
}

export const getCountProducts = async (
    filtersEnabled?: FilterEnabledModel[] | null,
    search?: string | null,
) => {
    let query = supabase
        .from('_products')
        .select('name', {count: 'exact'})

    filtersEnabled && filtersEnabled.forEach((filterEnabled: FilterEnabledModel) => {
        query = filtersHelper(filterEnabled, query)
    });
    if (search) query.or(`game->>name.ilike.%${search}%`)

    return query;
}

export const getFiltersProduct = async () => {
    const {data: gameData, error: errorGame} = await supabase
        .from('games')
        .select('name')

    const gamesName: FilterModel[] = [];

    gameData.forEach((item: any) => {
        gamesName.push({id: item.name, label: item.name})
    });

    const listValues: ProductFilterModel = {
        game: gamesName
    };

    const error = errorGame ? errorGame : null;

    return {listValues, error};
}

export const createProduct: any = async (postProductData: PostProductModel) => {
    const {data, error} = await supabase
        .from('products')
        .insert([postProductData])
        .single();

    return {data, error};
}

export const updateProduct: any = async (patchProductData: PatchProductModel, id: string) => {
    const {data, error} = await supabase
        .from('products')
        .update(patchProductData)
        .match({id: id})
        .single();

    return {data, error};
}

export const deleteProduct: any = async (id: string) => {
    const {data, error} = await supabase
        .from('products')
        .delete()
        .match({id: id})

    return {data, error};
}
