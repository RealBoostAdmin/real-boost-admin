import {OrderModel} from "../order/order.model";

export interface PostVoucherModel {
    amount?: number;
    percent?: number;
    used_at: boolean;
    order_id: string;
}

export interface PatchVoucherModel {
    amount?: number;
    percent?: number;
    used_at?: boolean
}

export interface VoucherModel {
    id: string;
    amount?: number;
    percent?: number;
    used_at: boolean
    orders: OrderModel[];
    created_at: Date;
    updated_at: Date;
}

