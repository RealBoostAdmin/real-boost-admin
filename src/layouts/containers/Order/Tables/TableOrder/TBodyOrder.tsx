import React from 'react';
import {TableBody, TableCell, TableRow} from '@mui/material';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router';
import {OrderModel} from '../../../../../core/models/order/order.model';
import {deleteOrder} from '../../../../../core/service/order/order.service';
import ActionButton from '../../../../components/Table/ActionButtons/ActionButtons';

interface IPropsTBodyOrder {
    handleOpen: (order?: OrderModel) => void;
    orders: OrderModel[];
    setDate: () => void;
}

const TBodyOrder = ({
                          handleOpen,
                          orders,
                          setDate
                      }: IPropsTBodyOrder) => {
    const navigate = useNavigate();

    const removeOrder = async (id: string): Promise<void> => {
        try {
            const {error} = await deleteOrder(id);
            if (error) {
                toast.error('Delete order has failed !')
            } else {
                toast.success('The order has been removed.')
                setDate();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <TableBody>
            {(orders && orders.length !== 0) && (
                orders.length !== 0 && orders.map((order: OrderModel) => (
                    <TableRow key={order.code} hover role="checkbox" tabIndex={-1}>
                        <TableCell
                            align={'center'}
                            sx={{cursor: 'pointer'}}
                            onClick={() => navigate(`../order/${order.code}`)}>
                            <b>{order.code}</b>
                        </TableCell>
                        <TableCell align={'center'}>
                            {order.amount}
                        </TableCell>
                        <TableCell align={'center'}>
                            {order.vat}
                        </TableCell>
                        <TableCell align={'center'}>
                            {order.currency}
                        </TableCell>
                        <TableCell align={'center'}>
                            {order?.mission?.code ? order.mission.code : '-'}
                        </TableCell>
                        <TableCell align={'center'}>
                            {order?.product?.name}
                        </TableCell>
                        <TableCell align={'center'}>
                            {order?.client?.username}
                        </TableCell>
                        <TableCell align={'center'}>
                            {order?.discount?.code ? order.discount.code : '-' }
                        </TableCell>
                        <ActionButton
                            model={order}
                            handleOpen={handleOpen}
                            deleteItem={removeOrder}
                        />
                    </TableRow>
                ))
            )}
        </TableBody>
    )
}

export default TBodyOrder;
