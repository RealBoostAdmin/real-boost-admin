import React from 'react';
import {TableBody, TableCell, TableRow} from '@mui/material';
import ActionButton from '../../../components/Table/ActionButtons/ActionButtons';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router';
import {ExtraModel} from '../../../../core/models/extra/extra.model';
import {deleteExtra} from '../../../../core/service/extra/extra.service';
import {OrderModel} from "../../../../core/models/order/order.model";
import EditRelationButton from "../../../components/Table/EditRelationButton/EditRelationButton";
import {OptionModel} from "../../../../core/models/option/option.model";
import {deleteOptionProduct, getOptionProduct} from "../../../../core/service/option_product/optionProduct.service";
import {deleteOptionOrder, getOptionOrder} from "../../../../core/service/option_order/optionOrder.service";
import {deleteExtraOrder, getExtraOrder} from "../../../../core/service/extra_order/extraOrder.service";

interface ITypesTBodyExtra {
    order?: OrderModel;
    handleOpen?: (extra?: ExtraModel) => void;
    extras: ExtraModel[];
    setDate: () => void;
}

const TBodyExtra = ({
                        order,
                        handleOpen,
                        extras,
                        setDate
                    }: ITypesTBodyExtra) => {
    const navigate = useNavigate();

    const removeExtra = async (id: string): Promise<void> => {
        try {
            const {error} = await deleteExtra(id);
            if (error) {
                toast.error('Delete extra has failed !')
            } else {
                toast.success('The extra has been removed.')
                setDate();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const removeRelation = async (extra: ExtraModel) => {
        try {
            if (extra && order) {
                const query = await getExtraOrder(extra.id, order.id); // Check if data already exists
                if (query.data && query.data.length !== 0) {
                    const {error} = await deleteExtraOrder(query.data[0].id);
                    if (error) {
                        toast.error(`Delete on Relation between the extra ${extra.name} and the order ${order.code} has failed !`);
                    } else {
                        toast.success(`Relation between the extra ${extra.name} and the order ${order.code} has been deleted !`);
                        setDate();
                    }
                }
            }
        } catch (error) {
            toast.error(`Error on removing relation between extra and order !`);
            console.log(error);
        }
    }

    return (
        <TableBody>
            {(extras && extras.length !== 0) && (
                extras.length !== 0 && extras.map((extra: ExtraModel) => (
                    <TableRow key={extra.name} hover role="checkbox" tabIndex={-1}>
                        <TableCell
                            key={extra.name}
                            align={'center'}
                            sx={{cursor: 'pointer'}}
                            onClick={() => navigate(`../extra/${extra.id}`)}>
                            <b>{extra.name}</b>
                        </TableCell>
                        <TableCell
                            key={extra.amount}
                            align={'center'}
                            sx={{cursor: 'pointer'}}
                        >
                            {extra.amount}
                        </TableCell>
                        <TableCell
                            key={extra.percent}
                            align={'center'}
                            sx={{cursor: 'pointer'}}
                        >
                            {extra.percent}
                        </TableCell>
                        {!order &&
                        <ActionButton
                            model={extra}
                            handleOpen={handleOpen}
                            deleteItem={removeExtra}
                        />
                        }
                        {order && <EditRelationButton model={extra} editRelation={removeRelation}/>}
                    </TableRow>
                ))
            )}
        </TableBody>
    )
}

export default TBodyExtra;
