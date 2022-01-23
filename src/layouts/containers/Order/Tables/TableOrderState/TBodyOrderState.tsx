import React from 'react';
import {TableBody, TableCell, TableRow} from '@mui/material';
import {toast} from 'react-toastify';
import ActionButton from '../../../../components/Table/ActionButtons/ActionButtons';
import {OrderStateModel} from "../../../../../core/models/order_state/order_state.model";
import {deleteModelHelper} from "../../../../../core/helpers/query/query.helper";

interface IPropsTBodyOrderState {
    handleOpen: (orderState?: OrderStateModel) => void;
    orderStates: OrderStateModel[];
    setDate: () => void;
}

const TBodyOrderState = ({
                             handleOpen,
                             orderStates,
                             setDate
                         }: IPropsTBodyOrderState) => {

    const removeOrderState = async (id: string): Promise<void> => {
        try {
            const {error} = await deleteModelHelper('order_states', id);
            if (error) {
                toast.error('Delete order state has failed !')
            } else {
                toast.success('The order state has been removed.')
                setDate();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <TableBody>
            {(orderStates && orderStates.length !== 0) && (
                orderStates.length !== 0 && orderStates.map((orderState: OrderStateModel) => (
                    <TableRow key={orderState.id} hover role="checkbox" tabIndex={-1}>
                        <TableCell
                            align={'center'}
                        >
                            <b>{orderState.user.username}</b>
                        </TableCell>
                        <TableCell align={'center'}>
                            {!!orderState.interested ? 'Yes' : 'No'}
                        </TableCell>
                        <ActionButton
                            model={orderState}
                            handleOpen={handleOpen}
                            deleteItem={removeOrderState}
                        />
                    </TableRow>
                ))
            )}
        </TableBody>
    )
}

export default TBodyOrderState;
