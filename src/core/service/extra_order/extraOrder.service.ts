import {supabase} from '../../supabase/client';
import {OrderModel} from '../../models/order/order.model';
import {PostExtraOrderModel} from "../../models/extra_order/extra_order";

export const getExtrasOfOrder:OrderModel[] | any = async (orderId: string) => {

    let query = supabase
        .from('_extras_orders')
        .select('*')
        .eq('extra_order->>order_id', orderId)

    return query;
}

export const getExtraOrder:OrderModel | any = async (extraId: string, orderId: string) => {

    let query = supabase
        .from('extras_orders')
        .select('*')
        .match({extra_id: extraId, order_id: orderId})
        .limit(1)

    return query;
}

export const createExtraOrder: any = async (postExtraData: PostExtraOrderModel) => {
    const {data, error: errorExtraOrder} = await supabase
        .from('extras_orders')
        .insert([postExtraData])
        .single();

    return {data, errorExtraOrder};
}

export const deleteExtraOrder: any = async (id: string) => {
    const {data, error} = await supabase
        .from('extras_orders')
        .delete()
        .match({id: id})

    return {data, error};
}
