import {BillModel} from '../bill/bill.model';

export interface PostPaymentModel {
    bill_id: string;
}

export interface PaymentModel {
    id: string;
    bill: BillModel
    created_at: Date;
    updated_at: Date;
}
