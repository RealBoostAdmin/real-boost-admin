import React from 'react';
import {TableBody, TableCell, TableRow} from '@mui/material';
import ActionButton from '../../../components/Table/ActionButtons/ActionButtons';
import {TranslationModel} from '../../../../core/models/translation/translation.model';
import {deleteTranslation} from '../../../../core/service/translation/translation.service';
import {useDispatch} from 'react-redux';
import {deleteTranslationState} from '../../../../core/store/translation/translation.actions';
import {toast} from 'react-toastify';

interface ITypesTBodyTranslation {
    handleOpen: (translation?: TranslationModel) => void;
    translations: TranslationModel[];
    setDate: () => void;
}

const TBodyTranslation = ({
                              handleOpen,
                              translations,
                              setDate
                          }: ITypesTBodyTranslation) => {
    const dispatch = useDispatch();

    const removeTranslation = async (id: string): Promise<void> => {
        try {
            const {error} = await deleteTranslation(id);
            if (error) {
                toast.error('Delete translation has failed !')
            } else {
                await dispatch(deleteTranslationState(id));
                toast.success('The translation has been removed.')
                setDate();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <TableBody>
            {translations.length !== 0 && translations.map((translation: TranslationModel) => {
                return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={translation.id}>
                        <TableCell key={translation.code} align={'center'}>
                            {translation.code}
                        </TableCell>
                        <TableCell key={translation.flag} align={'center'}>
                            {translation.flag}
                        </TableCell>
                        <ActionButton
                            model={translation}
                            handleOpen={handleOpen}
                            deleteItem={removeTranslation}
                        />
                    </TableRow>
                );
            })}
        </TableBody>
    )
}

export default TBodyTranslation;
