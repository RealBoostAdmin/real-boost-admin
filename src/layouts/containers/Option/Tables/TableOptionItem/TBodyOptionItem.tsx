import React from 'react';
import {TableBody, TableCell, TableRow} from '@mui/material';
import ActionButton from '../../../../components/Table/ActionButtons/ActionButtons';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router';
import {deleteOptionItem} from '../../../../../core/service/option/optionItem.service';
import {OptionItemModel} from '../../../../../core/models/option/option-item.model';

interface ITypesTBodyOptionItem {
    handleOpen: (optionItem?: OptionItemModel) => void;
    optionItems: OptionItemModel[];
    setDate: () => void;
}

const TBodyOptionItem = ({
                         handleOpen,
                         optionItems,
                         setDate
                     }: ITypesTBodyOptionItem) => {
    const navigate = useNavigate();

    const removeOptionItem = async (id: string): Promise<void> => {
        try {
            const {error} = await deleteOptionItem(id);
            if (error) {
                toast.error('Delete option item has failed !')
            } else {
                toast.success('The option item has been removed.')
                setDate();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <TableBody>
            {(optionItems && optionItems.length !== 0) && (
                optionItems.length !== 0 && optionItems.map((optionItem: OptionItemModel) => (
                    <TableRow key={optionItem.id} hover role="checkbox" tabIndex={-1}>
                        <TableCell
                            align={'center'}
                            sx={{cursor: 'pointer'}}
                            onClick={() => navigate(`./item/${optionItem.id}`)}>
                            <b>{optionItem.name}</b>
                        </TableCell>
                        <TableCell
                            align={'center'}
                            sx={{cursor: 'pointer'}}
                        >
                            {optionItem.amount ? optionItem.amount : '-'}
                        </TableCell>
                        <TableCell
                            align={'center'}
                            sx={{cursor: 'pointer'}}
                        >
                            {optionItem.percent ? optionItem.percent : '-'}
                        </TableCell>
                        <ActionButton
                            model={optionItem}
                            handleOpen={handleOpen}
                            deleteItem={removeOptionItem}
                        />
                    </TableRow>
                ))
            )}
        </TableBody>
    )
}

export default TBodyOptionItem;
