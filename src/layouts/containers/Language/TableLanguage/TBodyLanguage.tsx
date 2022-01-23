import React, {useState} from 'react';
import {TableBody, TableCell, TableRow} from '@mui/material';
import {LanguageModel} from '../../../../core/models/language/language.model';
import ActionButton from '../../../components/Table/ActionButtons/ActionButtons';
import {deleteLanguage} from '../../../../core/service/language/language.service';
import {toast} from 'react-toastify';

interface ITypesTBodyLanguage {
    handleOpen: (language?: LanguageModel) => void;
    languages: LanguageModel[];
    setDate: () => void;
}

const TBodyLanguage = ({
                           handleOpen,
                           languages,
                           setDate
                       }: ITypesTBodyLanguage) => {
    const [loading, setLoading] = useState<boolean>(false);

    const removeLanguage = async (id: string): Promise<void> => {
        setLoading(true);
        try {
            const {error} = await deleteLanguage(id);
            if (error) {
                toast.error('Delete language has failed !')
            } else {
                toast.success('The language has been removed.')
                setDate();
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <TableBody>
            {languages && languages.length !== 0 ? (
                languages.length !== 0 && languages.map((language: LanguageModel) => {
                    return (
                        <TableRow hover key={language.name} role="checkbox" tabIndex={-1}>
                            <TableCell align={'center'}>
                                {language.name}
                            </TableCell>
                            <TableCell align={'center'}>
                                {language.translation.flag}
                            </TableCell>
                            <TableCell align={'center'}>
                                {language.translation.code}
                            </TableCell>
                            <TableCell align={'center'}>
                                {language.country.name}
                            </TableCell>
                            <ActionButton
                                model={language}
                                handleOpen={handleOpen}
                                deleteItem={removeLanguage}
                            />
                        </TableRow>
                    );
                })
            ) : loading ? (
                <p>Loading</p>
            ) : (
                <p>No Languages available</p>
            )}
        </TableBody>
    )
}

export default TBodyLanguage;
