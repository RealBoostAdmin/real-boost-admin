import React, {useEffect, useState} from 'react';
import {Paper, TableContainer} from '@mui/material';
import Table from '@mui/material/Table';
import MyModal from '../../components/Modal/MyModal';
import {TranslationModel} from '../../../core/models/translation/translation.model';
import {getTranslations} from '../../../core/service/translation/translation.service';
import THeadTranslation from './TableTranslation/THeadTranslation';
import TBodyTranslation from './TableTranslation/TBodyTranslation';
import FormTranslation from './FormTranslation/FormTranslation';
import {toast} from 'react-toastify';
import HeadSection from "../../components/HeadSection/HeadSection";
import {handleCloseHelper, handleOpenHelper} from "../../../core/helpers/modal/modal.helper";

const TranslationPage = () => {
    const [translations, setTranslations] = useState<TranslationModel[]>();
    const [translation, setTranslation] = useState<TranslationModel>();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [date, setDate] = useState<Date>(new Date());
    const handleOpen = (translation: TranslationModel): void => handleOpenHelper(setTranslation, setOpen, translation);
    const handleClose = (updated?: boolean): void => handleCloseHelper(setDate, setTranslation, setOpen, updated);

    useEffect(() => {
        const fetchTranslations = async () => {
            try {
                setLoading(true);
                const {data, error} = await getTranslations();
                if (error) {
                    setErrorMessage('Load of translation has failed !');
                    toast.error('Load of translation has failed !')
                } else {
                    setTranslations(data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchTranslations()
    }, [date]);

    return (
        <>
            <HeadSection
                title={"List of translations"}
                textButton={"Add Translation"}
                handleOpen={handleOpen}
            />
            {translations && translations.length !== 0 ? (
                    <>
                        <Paper>
                            <TableContainer>
                                <Table>
                                    <THeadTranslation/>
                                    <TBodyTranslation
                                        translations={translations}
                                        handleOpen={handleOpen}
                                        setDate={() => setDate(new Date())}
                                    />
                                </Table>
                            </TableContainer>
                        </Paper>
                    </>
                )
                : loading ? (
                    <p>Loading</p>
                ) : errorMessage ? (
                    <p>{errorMessage}</p>
                ) : (
                    <p>No translations available</p>
                )}
            <MyModal
                open={open}
                handleClose={handleClose}>
                <FormTranslation
                    translation={translation}
                    handleClose={handleClose}
                />
            </MyModal>
        </>
    )
}

export default TranslationPage;
