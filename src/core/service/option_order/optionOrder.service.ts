import {supabase} from '../../supabase/client';
import {OrderModel} from '../../models/order/order.model';
import {PostOptionOrderModel} from '../../models/option_order/option_order';

export const getOptionsOfOrder:OrderModel[] | any = async (orderId: string) => {

    let query = supabase
        .from('_options_orders')
        .select('*')
        .eq('option_order->>order_id', orderId)

    return query;
}

export const getOptionOrder:OrderModel | any = async (optionId: string, orderId: string) => {

    let query = supabase
        .from('options_orders')
        .select('*')
        .match({option_id: optionId, order_id: orderId})
        .limit(1)

    return query;
}

export const createOptionOrder: any = async (postOptionData: PostOptionOrderModel) => {
    const {data, error: errorOptionOrder} = await supabase
        .from('options_orders')
        .insert([postOptionData])
        .single();

    return {data, errorOptionOrder};
}

export const deleteOptionOrder: any = async (id: string) => {
    const {data, error} = await supabase
        .from('options_orders')
        .delete()
        .match({id: id})

    return {data, error};
}
