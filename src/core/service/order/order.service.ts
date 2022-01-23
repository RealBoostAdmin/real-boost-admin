import {supabase} from '../../supabase/client';
import {OrderModel, PatchOrderModel, PostOrderModel} from '../../models/order/order.model';

export const getOrder: OrderModel | any = async (code: string) => {

    let query = await supabase
        .from('_orders')
        .select('*')
        .match({code: code})
        .limit(1)
        .single()

    return query;
}

export const getLastOrder: OrderModel[] | any = async () => {
    let query = supabase
        .from('orders')
        .select('*')
        .order('created_at', {ascending: false})
        .limit(1)

    return query;
}

export const getOrders: OrderModel[] | any = async (
    currentPage: number = 1,
    search?: string | null,
    sort: string = 'code',
    limit: number | null = 10
) => {
    const startRange = (currentPage * limit) - limit;
    const endRange = currentPage * limit - 1;

    let query = supabase
        .from('_orders')
        .select('*')
        .range(startRange, endRange)

    if (search) query.or(`code.ilike.%${search}%,mission->>code.ilike.%${search}%,product->>name.ilike.%${search}%,client->>username.ilike.%${search}%,discount->>code.ilike.%${search}%`)

    query.order(sort)

    return query;
}

export const getCountOrders = async (
    search?: string | null,
) => {
    let query = supabase
        .from('_orders')
        .select('code', {count: 'exact'})

    if (search) query.or(`code.ilike.%${search}%,mission->>code.ilike.%${search}%,product->>name.ilike.%${search}%,client->>username.ilike.%${search}%,discount->>code.ilike.%${search}%`)

    return query;
}

export const createOrder: any = async (postOrderData: PostOrderModel) => {
    const {data, error} = await supabase
        .from('orders')
        .insert([postOrderData])
        .single();

    return {data, error};
}

export const updateOrder: any = async (patchOrderData: PatchOrderModel, id: string) => {
    const {data, error} = await supabase
        .from('orders')
        .update(patchOrderData)
        .match({id: id})
        .single();

    return {data, error};
}

export const deleteOrder: any = async (id: string) => {
    const {data, error} = await supabase
        .from('orders')
        .delete()
        .match({id: id})

    return {data, error};
}
