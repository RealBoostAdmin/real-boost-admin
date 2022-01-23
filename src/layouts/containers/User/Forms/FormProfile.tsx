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
import {UserModel} from '../../../../core/models/user/user.model';
import {createProfile, updateProfile} from '../../../../core/service/profile/profile.service';

type ProfileFormType = {
    currency?: string;
}

interface IAddProfileProps {
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

const FormProfile: React.FC<IAddProfileProps> = ({
                                                     edit,
                                                     user,
                                                     setDate
                                                 }) => {
    const classes = useStyles();
    const {register, formState, handleSubmit} = useForm<ProfileFormType>({mode: 'onChange'})
    const {isSubmitting, errors, isValid} = formState;

    const addProfile = async (postData: ProfileFormType): Promise<void> => {
        try {
            const {error} = await createProfile({...postData, user_id: user.id});
            if (error) {
                toast.error('Add profile has failed !')
            } else {
                toast.success(`The profile of ${user.email} has been added !`);
                setDate();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const editProfile = async (patchData: ProfileFormType): Promise<void> => {
        try {
            const {error} = await updateProfile(patchData, user.profile.id);
            error
                ? toast.error('Edit profile has failed !')
                : toast.success(`The profile of ${user.email} has been edited !`);
            if (error) {
                toast.error('Edit profile has failed !');
            } else {
                toast.success(`The profile of ${user.email} has been edited !`);
                setDate();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <HeaderFormModal
                title={edit ? 'Edit a profile and his translations' : 'Add a profile'}
            />
            <form onSubmit={handleSubmit(edit ? editProfile : addProfile)} className={classes.form}>
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <InputLabel htmlFor="currency">Currency</InputLabel>
                    <Input
                        type="text"
                        className="input-group"
                        name="currency"
                        defaultValue={edit ? user.profile?.currency : null}
                        placeholder={'Currency'}
                        id="currency"
                        {...register('currency', {required: 'This field is required.'})}
                        error={!!errors.currency}
                    />
                    {errors.currency && <ErrorInputForm errorMessage={errors.currency.message}/>}
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

export default FormProfile;
