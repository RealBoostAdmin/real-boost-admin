import React from 'react';
import {TableBody, TableCell, TableRow} from '@mui/material';
import ActionButton from '../../../components/Table/ActionButtons/ActionButtons';
import {CountryModel} from '../../../../core/models/country/country.model';
import {deleteCountry} from '../../../../core/service/country/country.service';
import {toast} from 'react-toastify';

interface ITypesTBodyCountry {
    handleOpen: (translation?: CountryModel) => void;
    countries: CountryModel[];
    setDate: () => void;
}

const TBodyCountry = ({
                          handleOpen,
                          countries,
                          setDate,
                      }: ITypesTBodyCountry) => {

    const removeCountry = async (id: string): Promise<void> => {
        try {
            const {error} = await deleteCountry(id);
            if (error) {
                toast.error('Delete country has failed !')
            } else {
                toast.success('The country has been removed.')
                setDate();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <TableBody>
            {countries.length !== 0 && countries.map((country: CountryModel) => {
                return (
                    <TableRow hover key={country.name} role="checkbox" tabIndex={-1} >
                        <TableCell align={'center'}>
                            {country.name}
                        </TableCell>
                        <ActionButton
                            model={country}
                            handleOpen={handleOpen}
                            deleteItem={removeCountry}
                        />
                    </TableRow>
                );
            })}
        </TableBody>
    )
}

export default TBodyCountry;
