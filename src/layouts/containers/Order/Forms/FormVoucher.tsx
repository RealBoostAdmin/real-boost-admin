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
import {OrderModel} from '../../../../core/models/order/order.model';
import {createModelHelper, updateModelHelper} from '../../../../core/helpers/query/query.helper';

type VoucherFormType = {
    amount: string;
    percent: number;
    usedAt: boolean;
}

interface IAddVoucherProps {
    order?: OrderModel | null;
    setDate?: (date: Date) => void;
}

const useStyles = makeStyles(() => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}))

const FormVoucher: React.FC<IAddVoucherProps> = ({
                                                     order,
                                                     setDate
                                                 }) => {
    const classes = useStyles();
    const {register, formState, handleSubmit} = useForm<VoucherFormType>({mode: 'onChange'})
    const {isSubmitting, errors, isValid} = formState;

    const addVoucher = async (postData: VoucherFormType): Promise<void> => {
        try {
            const {error} = await createModelHelper('vouchers', {...postData, order_id: order.id, used_at: new Date()});
            if (error) {
                toast.error('Add voucher has failed !');
            } else {
                toast.success(`The voucher has been added !`);
                setDate(new Date());
            }
        } catch
            (error) {
            console.log(error);
        }
    }

    const editVoucher = async (patchData: VoucherFormType): Promise<void> => {
        try {
            const {error} = await updateModelHelper('vouchers', {...patchData, used_at: new Date()}, order.voucher.id);
            if (error) {
                toast.error('Edit voucher has failed !');
            } else {
                toast.success(`The voucher has been edited !`);
                setDate(new Date());
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <HeaderFormModal title={order.voucher ? 'Edit a voucher' : 'Add a voucher'}/>
            <form onSubmit={handleSubmit(order.voucher ? editVoucher : addVoucher)}
                  className={classes.form}>
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <InputLabel htmlFor="amount">Amount</InputLabel>
                    <Input
                        type="number"
                        className="input-group"
                        name="amount"
                        defaultValue={order.voucher ? order.voucher?.amount : 0}
                        placeholder={'Amount Voucher'}
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
                        defaultValue={order.voucher ? order.voucher?.percent : 0}
                        placeholder={'Percent Voucher'}
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
                    {order.voucher ? 'Edit' : 'Create'}
                </Button>
            </form>
        </>
    )
}

export default FormVoucher;
