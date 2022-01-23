import {supabase} from '../../supabase/client';
import {BillModel, PatchBillModel, PostBillModel} from "../../models/bill/bill.model";

export const getLastBillOfMission: BillModel[] | any = async (missionId: string) => {
    let query = supabase
        .from('bills')
        .select('*')
        .match({mission_id: missionId})
        .order('created_at', {ascending: false})
        .limit(1)

    return query;
}

export const getBillsOfMission: BillModel[] | any = async (missionId: string) => {
    let query = supabase
        .from('_bills')
        .select('*')
        .match({mission_id: missionId})
        .order('created_at')

    return query;
}

export const createBill: any = async (postBillData: PostBillModel) => {
    const {data: dataBill, error: errorBill} = await supabase
        .from('bills')
        .insert([postBillData])
        .single();

    return {dataBill, errorBill};
}

export const updateBill: any = async (patchBillData: PatchBillModel, id: string) => {
    const {data, error} = await supabase
        .from('bills')
        .update(patchBillData)
        .match({id: id})
        .single();

    return {data, error};
}

export const deleteBill: any = async (id: string) => {
    const {data, error} = await supabase
        .from('bills')
        .delete()
        .match({id: id})

    return {data, error};
}
