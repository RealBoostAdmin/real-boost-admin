import {OrderModel} from "../order/order.model";
import {UserModel} from "../user/user.model";

export interface PostOrderStateModel {
    interested: boolean;
    user_id: string;
    order_id: string;
}

export interface PatchOrderStateModel {
    interested?: boolean;
}

export interface OrderStateModel {
    id: string;
    interested: boolean;
    user: UserModel;
    order: OrderModel
    created_at: Date;
    updated_at: Date;
}

