import React from 'react';
import {TableBody, TableCell, TableRow} from '@mui/material';
import ActionButton from '../../../../components/Table/ActionButtons/ActionButtons';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router';
import {deleteOption} from '../../../../../core/service/option/option.service';
import {OptionModel} from '../../../../../core/models/option/option.model';
import {ProductModel} from '../../../../../core/models/product/product.model';
import {deleteOptionProduct, getOptionProduct} from '../../../../../core/service/option_product/optionProduct.service';
import EditRelationButton from '../../../../components/Table/EditRelationButton/EditRelationButton';
import {OrderModel} from '../../../../../core/models/order/order.model';
import {deleteOptionOrder, getOptionOrder} from '../../../../../core/service/option_order/optionOrder.service';

interface ITBodyOptionProps {
    order?: OrderModel;
    product?: ProductModel;
    handleOpen?: (option?: OptionModel) => void;
    options: OptionModel[];
    setDate: () => void;
    editable?: boolean;
}

const TBodyOption = ({
                         order,
                         product,
                         handleOpen,
                         options,
                         setDate,
                         editable
                     }: ITBodyOptionProps) => {
    const navigate = useNavigate();

    const removeOption = async (id: string): Promise<void> => {
        try {
            const {error} = await deleteOption(id);
            if (error) {
                toast.error('Delete option has failed !')
            } else {
                toast.success('The option has been removed.')
                setDate();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const removeRelation = async (option: OptionModel) => {
        try {
            if (option && product) {
                const query = await getOptionProduct(option.id, product.id); // Check if data already exists
                if (query.data && query.data.length !== 0) {
                    const {error} = await deleteOptionProduct(query.data[0].id);
                    if (error) {
                        toast.error(`Delete on Relation between the option ${option.name} and the product ${product.name} has failed !`);
                    } else {
                        toast.success(`Relation between the option ${option.name} and the product ${product.name} has been deleted !`);
                        setDate();
                    }
                }
            } else if (option && order) {
                const query = await getOptionOrder(option.id, order.id);
                if (query.data && query.data.length !== 0) {
                    const {error} = await deleteOptionOrder(query.data[0].id);
                    if (error) {
                        toast.error(`Delete on Relation between the option ${option.name} and the order ${order.code} has failed !`);
                    } else {
                        toast.success(`Relation between the option ${option.name} and the order ${order.code} has been deleted !`);
                        setDate();
                    }
                }
            }
        } catch (error) {
            toast.error(`Error on removing relation between option and order !`);
            console.log(error);
        }
    }

    return (
        <TableBody>
            {(options && options.length !== 0) && (
                options.length !== 0 && options.map((option: OptionModel) => (
                    <TableRow key={option.id} hover role="checkbox" tabIndex={-1}>
                        <TableCell
                            align={'center'}
                            sx={{cursor: 'pointer'}}
                            onClick={() => navigate(`../option/${option.id}`)}>
                            <b>{option.name}</b>
                        </TableCell>
                        <TableCell
                            align={'center'}
                            sx={{cursor: 'pointer'}}
                        >
                            {option.multiple ? 'Yes' : 'No'}
                        </TableCell>
                        {editable &&
                        <ActionButton
                            model={option}
                            handleOpen={handleOpen}
                            deleteItem={removeOption}
                        />
                        }
                        {product && <EditRelationButton model={option} editRelation={removeRelation}/>}
                        {order && <EditRelationButton model={option} editRelation={removeRelation}/>}
                    </TableRow>
                ))
            )}
        </TableBody>
    )
}

export default TBodyOption;
