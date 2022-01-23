import React from 'react';
import {TableBody, TableCell, TableRow} from '@mui/material';
import ActionButton from '../../../components/Table/ActionButtons/ActionButtons';
import {toast} from 'react-toastify';
import {DiscountModel} from '../../../../core/models/discount/discount.model';
import {deleteDiscount, updateDiscount} from '../../../../core/service/discount/discount.service';
import {OrderModel} from '../../../../core/models/order/order.model';
import EditRelationButton from '../../../components/Table/EditRelationButton/EditRelationButton';
import {updateOrder} from '../../../../core/service/order/order.service';

interface ITypesTBodyDiscount {
    order?: OrderModel;
    handleOpen?: (discount?: DiscountModel) => void;
    discounts: DiscountModel[];
    setDate: () => void;
}

const TBodyDiscount = ({
                           order,
                           handleOpen,
                           discounts,
                           setDate
                       }: ITypesTBodyDiscount) => {

    const removeDiscount = async (id: string): Promise<void> => {
        try {
            const {error} = await deleteDiscount(id);
            if (error) {
                toast.error('Delete discount has failed !')
            } else {
                toast.success('The discount has been removed.')
                setDate();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const removeDiscountOfOrder = async () => {
        try {
            if (order) {
                const {error} = await updateOrder({discount_id: null}, order.id);
                if (error) {
                    toast.error(`Delete on Relation between the order and the discount has failed !`);
                } else {
                    toast.success(`Relation between the order and the discount has been deleted !`);
                    setDate();
                }
            }
        } catch (error) {
            toast.error(`Error on removing relation between order and discount !`);
            console.log(error);
        }
    }

    return (
        <TableBody>
            {(discounts && discounts.length !== 0) && (
                discounts.length !== 0 && discounts.map((discount: DiscountModel) => (
                    <TableRow key={discount.code} hover role="checkbox" tabIndex={-1}>
                        <TableCell
                            key={discount.code}
                            align={'center'}
                            sx={{cursor: 'pointer'}}
                        >
                            <b>{discount.code}</b>
                        </TableCell>
                        <TableCell
                            align={'center'}
                            sx={{cursor: 'pointer'}}
                        >
                            {discount.amount}
                        </TableCell>
                        <TableCell
                            align={'center'}
                            sx={{cursor: 'pointer'}}
                        >
                            {discount.percent}
                        </TableCell>
                        {!order &&
                        <ActionButton
                            model={discount}
                            handleOpen={handleOpen}
                            deleteItem={removeDiscount}
                        />
                        }
                        {order && <EditRelationButton editRelation={removeDiscountOfOrder}/>}
                    </TableRow>
                ))
            )}
        </TableBody>
    )
}

export default TBodyDiscount;
