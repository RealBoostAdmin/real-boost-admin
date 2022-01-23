export interface PostExtraOrderModel {
    extra_id: string;
    order_id: string;
}

export interface ExtraOrderModel {
    id: string;
    extra_id: string;
    order_id: string;
    created_at: Date;
    updated_at: Date;
}
