import {FormControl} from '@mui/material';
import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import {useForm} from 'react-hook-form';
import HeaderFormModal from '../../../components/Forms/HeaderFormModal/HeaderFormModal';
import './FormCountry.scss';
import {CountryModel} from '../../../../core/models/country/country.model';
import {createCountry, updateCountry} from '../../../../core/service/country/country.service';
import {toast} from 'react-toastify';
import ErrorInputForm from '../../../components/Errors/ErrorInputForm/ErrorInputForm';

type CountryFormType = {
    name: string;
}

interface CountryFormProps {
    country?: CountryModel | null;
    handleClose: (updated?: boolean) => void;
}

const FormCountry: React.FC<CountryFormProps> = ({
                                                             country,
                                                             handleClose
                                                         }) => {
    const {register, formState, handleSubmit} = useForm<CountryFormType>({mode: 'onChange'})
    const {isSubmitting, errors, isValid} = formState;

    const addCountry= async (postCountry: any): Promise<void> => {
        try {
            const {error} = await createCountry(postCountry);
            if (error) {
                toast.error('Add country has failed !')
            } else {
                toast.success('The country has been added.')
                handleClose(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const editCountry = async (patchCountry: any): Promise<void> => {
        try {
            const {error} = await updateCountry(patchCountry, country.id);
            if (error) {
                toast.error('Edit country has failed !')
            } else {
                toast.success('The country has been edited.')
                handleClose(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <HeaderFormModal
                title={country ? 'Edit a country' : 'Add a country'}
                handleClose={handleClose}
            />
            <form onSubmit={handleSubmit(country ? editCountry : addCountry)} className="form-country">
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <Input
                        type="text"
                        className="input-group"
                        name="name"
                        placeholder={'Name of country'}
                        id="name-input"
                        defaultValue={country ? country.name : null}
                        {...register('name', {required: 'This field is required.'})}
                        error={!!errors.name}
                    />
                    {errors.name && <ErrorInputForm errorMessage={errors.name.message}/>}
                </FormControl>
                <Button
                    sx={{marginTop: '1rem'}}
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting || !isValid}
                >
                    {country ? 'Edit' : 'Create'}
                </Button>
            </form>
        </>
    )
}

export default FormCountry;
