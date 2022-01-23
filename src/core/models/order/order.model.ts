import {FilterModel} from '../utils/filters/filter.model';
import {UserModel} from "../user/user.model";
import {ProductModel} from "../product/product.model";
import {OptionModel} from "../option/option.model";
import {ExtraModel} from "../extra/extra.model";
import {MissionModel} from "../mission/mission.model";
import {DiscountModel} from "../discount/discount.model";
import {VoucherModel} from "../voucher/voucher.model";
import {OrderStateModel} from "../order_state/order_state.model";

export interface PostOrderModel {
    code: string;
    details?: string;
    amount: number;
    vat: number;
    currency: string;
    comment?: string;
    client_id: string;
    booster_id?: string;
    product_id: string;
}

export interface PatchOrderModel {
    details?: string;
    amount?: number;
    vat?: number;
    currency?: string;
    comment?: string;
    client_id?: string;
    booster_id?: string;
    product_id?: string;
}

export interface OrderModel {
    id: string;
    code: string;
    details?: string;
    amount: number;
    vat: number;
    currency: string;
    comment?: string;
    client: UserModel;
    booster?: UserModel;
    product: ProductModel;
    options: OptionModel[];
    extras: ExtraModel[];
    discount?: DiscountModel;
    voucher: VoucherModel;
    states: OrderStateModel;
    mission: MissionModel;
    created_at: Date;
    updated_at: Date;
}
