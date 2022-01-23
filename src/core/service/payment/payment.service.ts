import {supabase} from '../../supabase/client';
import {PostPaymentModel} from "../../models/payment/payment.model";

export const createPayment: any = async (postPaymentData: PostPaymentModel) => {
    const {data, error} = await supabase
        .from('payments')
        .insert([postPaymentData])
        .single();

    return {data, error};
}

export const deletePayment: any = async (id: string) => {
    const {data, error} = await supabase
        .from('payments')
        .delete()
        .match({id: id})

    return {data, error};
}
