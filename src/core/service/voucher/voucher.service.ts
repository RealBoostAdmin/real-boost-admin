import {supabase} from '../../supabase/client';
import {PatchVoucherModel, PostVoucherModel} from '../../models/voucher/voucher.model';

export const createVoucher: any = async (postVoucherData: PostVoucherModel) => {
    const {data, error} = await supabase
        .from('vouchers')
        .insert([postVoucherData])
        .single();

    return {data, error};
}

export const updateVoucher: any = async (patchVoucherData: PatchVoucherModel, id: string) => {
    const {data, error} = await supabase
        .from('vouchers')
        .update(patchVoucherData)
        .match({id: id})
        .single();

    return {data, error};
}

export const deleteVoucher: any = async (id: string) => {
    const {data, error} = await supabase
        .from('vouchers')
        .delete()
        .match({id: id})

    return {data, error};
}
