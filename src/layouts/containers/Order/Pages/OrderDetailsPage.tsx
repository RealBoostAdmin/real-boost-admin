import React, {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import HeadSection from '../../../components/HeadSection/HeadSection';
import {useParams} from "react-router";
import {getOrder} from '../../../../core/service/order/order.service';
import {OrderModel} from '../../../../core/models/order/order.model';
import TabsOrder from '../Tabs/TabsOrder';

const OrderDetailsPage: React.FC = () => {
    const [order, setOrder] = useState<OrderModel>();
    const [loading, setLoading] = useState<boolean>(false);
    const [date, setDate] = useState<Date>(new Date());
    const {code} = useParams();

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                setLoading(true);
                const {data, error} = await getOrder(code);
                error || !data ? toast.error('Loading order has failed ! ') : setOrder(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [date, setOrder])

    return (
        <>
            <HeadSection title={`Detail of ${order?.code}`} back={true}/>
            {!loading && !!order && <TabsOrder order={order} setDate={setDate}/>}
        </>
    )
}

export default OrderDetailsPage;
