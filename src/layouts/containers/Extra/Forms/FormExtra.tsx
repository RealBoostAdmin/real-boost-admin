import {FormControl} from '@mui/material';
import React, {useState} from 'react';
import {makeStyles} from '@mui/styles';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import {useForm} from 'react-hook-form';
import HeaderFormModal from '../../../components/Forms/HeaderFormModal/HeaderFormModal';
import {toast} from 'react-toastify';
import ErrorInputForm from '../../../components/Errors/ErrorInputForm/ErrorInputForm';
import {ExtraModel} from '../../../../core/models/extra/extra.model';
import {createExtra, updateExtra} from '../../../../core/service/extra/extra.service';

type ExtraFormType = {
    name: string;
    amount?: number;
    percent?: number;
}

interface IAddExtraProps {
    extra?: ExtraModel | null;
    handleClose: (updated?: boolean) => void;
}

const useStyles = makeStyles(() => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}))

const FormExtra: React.FC<IAddExtraProps> = ({
                                                 extra,
                                                 handleClose
                                             }) => {
    const classes = useStyles();
    const {register, formState, handleSubmit} = useForm<ExtraFormType>({mode: 'onChange'})
    const {isSubmitting, errors, isValid} = formState;

    const addExtra = async (postData: ExtraFormType): Promise<void> => {
        try {
            const {data, error} = await createExtra({...postData});
            if (error) {
                toast.error('Add extra has failed !');
            } else {
                toast.success(`The extra ${data.name} has been added !`);
                handleClose(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const editExtra = async (patchData: ExtraFormType): Promise<void> => {
        try {
            const {data, error} = await updateExtra({...patchData}, extra.id);
            if (error) {
                toast.error('Edit extra has failed !');
            } else {
                toast.success(`The extra ${data.name} has been edited !`);
                handleClose(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <HeaderFormModal
                title={extra ? 'Edit a extra and his translations' : 'Add a extra'}
                handleClose={handleClose}
            />
            <form onSubmit={handleSubmit(extra ? editExtra : addExtra)} className={classes.form}>
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <InputLabel htmlFor="name">Name of the extra</InputLabel>
                    <Input
                        type="text"
                        className="input-group"
                        name="name"
                        defaultValue={extra ? extra?.name : null}
                        placeholder={'Name of Extra'}
                        id="name-input"
                        {...register('name', {required: 'This field is required.'})}
                        error={!!errors.name}
                    />
                    {errors.name && <ErrorInputForm errorMessage={errors.name.message}/>}
                </FormControl>
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <InputLabel htmlFor="amount">Amount</InputLabel>
                    <Input
                        type="number"
                        className="input-group"
                        name="amount"
                        defaultValue={extra ? extra?.amount : 0}
                        placeholder={'Amount of the extra'}
                        id="amount-input"
                        {...register('amount', {valueAsNumber: true})}
                        error={!!errors.amount}
                    />
                    {errors.amount && <ErrorInputForm errorMessage={errors.amount.message}/>}
                </FormControl>
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <InputLabel htmlFor="percent">Percent</InputLabel>
                    <Input
                        type="number"
                        className="input-group"
                        name="percent"
                        defaultValue={extra ? extra?.percent : 0}
                        placeholder={'Percent of the Option item'}
                        id="percent-input"
                        {...register('percent', {valueAsNumber: true})}
                        error={!!errors.percent}
                    />
                    {errors.percent && <ErrorInputForm errorMessage={errors.percent.message}/>}
                </FormControl>
                <Button
                    sx={{marginTop: '1rem'}}
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting || !isValid}
                >
                    {extra ? 'Edit' : 'Create'}
                </Button>
            </form>
        </>
    )
}

export default FormExtra;
