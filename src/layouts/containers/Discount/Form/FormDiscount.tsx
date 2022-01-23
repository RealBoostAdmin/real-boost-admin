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
import {DiscountModel} from '../../../../core/models/discount/discount.model';
import {createDiscount, updateDiscount} from '../../../../core/service/discount/discount.service';

type DiscountFormType = {
    code: string;
    amount?: number;
    percent?: number;
}

interface IAddDiscountProps {
    discount?: DiscountModel | null;
    handleClose: (updated?: boolean) => void;
}

const useStyles = makeStyles(() => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}))

const FormDiscount: React.FC<IAddDiscountProps> = ({
                                                 discount,
                                                 handleClose
                                             }) => {
    const classes = useStyles();
    const {register, formState, handleSubmit} = useForm<DiscountFormType>({mode: 'onChange'})
    const {isSubmitting, errors, isValid} = formState;

    const addDiscount = async (postData: DiscountFormType): Promise<void> => {
        try {
            const {data, error} = await createDiscount({
                ...postData,
            });
            if (error) {
                toast.error('Add discount has failed !');
            } else {
                toast.success(`The discount ${data.name} has been added !`);
                handleClose(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const editDiscount = async (patchData: DiscountFormType): Promise<void> => {
        try {
            const {data, error} = await updateDiscount({
                    ...patchData
                },
                discount.id);
            if (error) {
                toast.error('Edit discount has failed !');
            } else {
                toast.success(`The discount ${data.name} has been edited !`);
                handleClose(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <HeaderFormModal
                title={discount ? 'Edit a discount' : 'Add a discount'}
                handleClose={handleClose}
            />
            <form onSubmit={handleSubmit(discount ? editDiscount : addDiscount)} className={classes.form}>
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <InputLabel htmlFor="name">Code</InputLabel>
                    <Input
                        type="text"
                        className="input-group"
                        name="code"
                        defaultValue={discount ? discount?.code : null}
                        placeholder={'Code Discount'}
                        id="code-input"
                        {...register('code', {required: 'This field is required.'})}
                        error={!!errors.code}
                    />
                    {errors.code && <ErrorInputForm errorMessage={errors.code.message}/>}
                </FormControl>
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <InputLabel htmlFor="amount">Amount</InputLabel>
                    <Input
                        type="number"
                        className="input-group"
                        name="amount"
                        defaultValue={discount ? discount?.amount : 0}
                        placeholder={'Amount Discount'}
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
                        defaultValue={discount ? discount?.percent : 0}
                        placeholder={'Percent Discount'}
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
                    {discount ? 'Edit' : 'Create'}
                </Button>
            </form>
        </>
    )
}

export default FormDiscount;
