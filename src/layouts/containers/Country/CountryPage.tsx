import React, {useEffect, useState} from 'react';
import {Paper, TableContainer} from '@mui/material';
import Table from '@mui/material/Table';
import MyModal from '../../components/Modal/MyModal';
import {CountryModel} from '../../../core/models/country/country.model';
import FormCountry from './FormCountry/FormCountry';
import THeadCountry from './TableCountry/THeadCountry';
import TBodyCountry from './TableCountry/TBodyCountry';
import {getCountries} from '../../../core/service/country/country.service';
import {toast} from 'react-toastify';
import HeadSection from '../../components/HeadSection/HeadSection';
import {handleCloseHelper, handleOpenHelper} from '../../../core/helpers/modal/modal.helper';

const CountryPage = () => {
    const [countries, setCountries] = useState<CountryModel[]>();
    const [country, setCountry] = useState<CountryModel>();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [date, setDate] = useState<Date>(new Date());
    const handleOpen = (country: CountryModel): void => handleOpenHelper(setCountry, setOpen, country);
    const handleClose = (updated?: boolean): void => handleCloseHelper(setDate, setCountry, setOpen, updated);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                setLoading(true);
                const {data, error} = await getCountries();
                if (error) {
                    setErrorMessage('Load of countries has failed !');
                    toast.error('Load of countries has failed !')
                } else {
                    setCountries(data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchCountries()
    }, [date]);

    return (
        <>
            <HeadSection
                title={'List of countries'}
                textButton={'Add Country'}
                handleOpen={() => handleOpen(country)}
            />
            {countries && countries.length !== 0 ? (
                    <>
                        <Paper>
                            <TableContainer>
                                <Table>
                                    <THeadCountry/>
                                    <TBodyCountry
                                        countries={countries}
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
                    <p>No countries available</p>
                )}
            <MyModal
                open={open}
                handleClose={handleClose}>
                <FormCountry
                    country={country}
                    handleClose={handleClose}
                />
            </MyModal>
        </>
    )
}

export default CountryPage;
