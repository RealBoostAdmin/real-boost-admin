export interface PostOptionOrderModel {
    option_id: string;
    order_id: string;
}

export interface OptionOrderModel {
    id: string;
    option_id: string;
    order_id: string;
    created_at: Date;
    updated_at: Date;
}
