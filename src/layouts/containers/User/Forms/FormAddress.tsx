import {FormControl} from '@mui/material';
import React from 'react';
import {makeStyles} from '@mui/styles';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import {useForm} from 'react-hook-form';
import HeaderFormModal from '../../../components/Forms/HeaderFormModal/HeaderFormModal';
import {toast} from 'react-toastify';
import ErrorInputForm from '../../../components/Errors/ErrorInputForm/ErrorInputForm';
import {createAddress, updateAddress} from '../../../../core/service/address/address.service';
import {UserModel} from '../../../../core/models/user/user.model';

type AddressFormType = {
    firstname?: string;
    lastname?: string;
    address?: string;
    zipcode?: string;
    city?: string;
    country?: string;
}

interface IAddAddressProps {
    edit: boolean;
    user: UserModel;
    setDate: () => void;
}

const useStyles = makeStyles(() => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}))

const FormAddress: React.FC<IAddAddressProps> = ({
                                                     edit,
                                                     user,
                                                     setDate
                                                 }) => {
    const classes = useStyles();
    const {register, formState, handleSubmit} = useForm<AddressFormType>({mode: 'onChange'})
    const {isSubmitting, errors, isValid} = formState;

    const addAddress = async (postData: AddressFormType): Promise<void> => {
        try {
            const {data, error} = await createAddress({...postData, user_id: user.id});
            if (error) {
                toast.error('Add address has failed !');
            } else {
                toast.success(`The address with firstname ${data.firstname} has been added !`);
                setDate();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const editAddress = async (patchData: AddressFormType): Promise<void> => {
        try {
            const {data, error} = await updateAddress(patchData, user.address.id);
            if (error) {
                toast.error('Edit address has failed !');
            } else {
                toast.success(`The address with firstname ${data.firstname} has been edited !`);
                setDate();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <HeaderFormModal
                title={edit ? 'Edit address' : 'Add address'}
            />
            <form onSubmit={handleSubmit(edit ? editAddress : addAddress)} className={classes.form}>
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <InputLabel htmlFor="firstname">Firstname</InputLabel>
                    <Input
                        type="text"
                        className="input-group"
                        name="firstname"
                        defaultValue={edit ? user.address?.firstname : null}
                        placeholder={'Firstname'}
                        id="firstname"
                        {...register('firstname', {required: 'This field is required.'})}
                        error={!!errors.firstname}
                    />
                    {errors.firstname && <ErrorInputForm errorMessage={errors.firstname.message}/>}
                </FormControl>
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <InputLabel htmlFor="lastname">Lastname</InputLabel>
                    <Input
                        type="text"
                        className="input-group"
                        name="lastname"
                        defaultValue={edit ? user.address?.lastname : null}
                        placeholder={'Lastname'}
                        id="lastname"
                        {...register('lastname')}
                        error={!!errors.lastname}
                    />
                    {errors.lastname && <ErrorInputForm errorMessage={errors.lastname.message}/>}
                </FormControl>
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <InputLabel htmlFor="address">Address</InputLabel>
                    <Input
                        type="text"
                        className="input-group"
                        name="address"
                        defaultValue={edit ? user.address?.address : null}
                        placeholder={'Address'}
                        id="address"
                        {...register('address')}
                        error={!!errors.address}
                    />
                    {errors.address && <ErrorInputForm errorMessage={errors.address.message}/>}
                </FormControl>
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <InputLabel htmlFor="zipcode">Zip code</InputLabel>
                    <Input
                        type="text"
                        className="input-group"
                        name="zipcode"
                        defaultValue={edit ? user.address?.zipcode : null}
                        placeholder={'Zip code'}
                        id="zipcode"
                        {...register('zipcode')}
                        error={!!errors.zipcode}
                    />
                    {errors.zipcode && <ErrorInputForm errorMessage={errors.zipcode.message}/>}
                </FormControl>
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <InputLabel htmlFor="city">City</InputLabel>
                    <Input
                        type="text"
                        className="input-group"
                        name="city"
                        defaultValue={edit ? user.address?.city : null}
                        placeholder={'City'}
                        id="city"
                        {...register('city')}
                        error={!!errors.city}
                    />
                    {errors.city && <ErrorInputForm errorMessage={errors.city.message}/>}
                </FormControl>
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <InputLabel htmlFor="country">Country</InputLabel>
                    <Input
                        type="text"
                        className="input-group"
                        name="country"
                        defaultValue={edit ? user.address?.country : null}
                        placeholder={'Country'}
                        id="country"
                        {...register('country')}
                        error={!!errors.country}
                    />
                    {errors.country && <ErrorInputForm errorMessage={errors.country.message}/>}
                </FormControl>
                <Button
                    sx={{marginTop: '1rem'}}
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting || !isValid}
                >
                    {edit ? 'Edit' : 'Create'}
                </Button>
            </form>
        </>
    )
}

export default FormAddress;
