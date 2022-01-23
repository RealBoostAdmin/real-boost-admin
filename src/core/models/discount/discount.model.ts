import {OrderModel} from "../order/order.model";

export interface PostDiscountModel {
    code: string;
    amount?: number;
    percent?: number;
}

export interface PatchDiscountModel {
    amount?: number;
    percent?: number;
}

export interface DiscountModel {
    id: string;
    code: string;
    amount?: number;
    percent?: number;
    orders: OrderModel[];
    created_at: Date;
    updated_at: Date;
}

