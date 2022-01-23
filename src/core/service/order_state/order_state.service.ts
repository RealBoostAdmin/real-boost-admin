import {supabase} from '../../supabase/client';
import {OrderStateModel} from "../../models/order_state/order_state.model";

export const getOrderState: OrderStateModel | any = async (id: string) => {

    let query = supabase
        .from('_order_states')
        .select('*')
        .match({id: id})
        .limit(1)
        .single()

    return query;
}

export const getOrderStates: OrderStateModel[] | any = async (
    orderId: string,
    sort: string = 'created_at',
) => {
    let query = supabase
        .from('_order_states')
        .select('*')
        .match({order_id: orderId})

    query.order(sort)

    return query;
}
