import React from 'react';
import HeadSection from '../../../../components/HeadSection/HeadSection';
import {OrderModel} from '../../../../../core/models/order/order.model';
import FormVoucher from '../../Forms/FormVoucher';

interface IPropsTabVoucher {
    order: OrderModel;
    setDate: (date: Date) => void;
}

const TabVoucher: React.FC<IPropsTabVoucher> = ({order, setDate}) => {

    return (
        <>
            <HeadSection title={`Create voucher for the order : ${order.code}`}/>
            {<FormVoucher order={order} setDate={setDate}/>}
        </>
    )
}

export default TabVoucher;
