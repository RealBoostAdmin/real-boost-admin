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
import {OptionItemModel} from '../../../../core/models/option/option-item.model';
import {createOptionItem, updateOptionItem} from '../../../../core/service/option/optionItem.service';
import {OptionModel} from '../../../../core/models/option/option.model';

type OptionItemFormType = {
    name: string;
    amount?: number;
    percent?: number;
}

interface IAddOptionItemProps {
    option: OptionModel;
    optionItem?: OptionItemModel | null;
    handleClose: (updated?: boolean) => void;
}

const useStyles = makeStyles(() => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}))

const FormOptionItem: React.FC<IAddOptionItemProps> = ({
                                                           option,
                                                           optionItem,
                                                           handleClose
                                                       }) => {
    const classes = useStyles();
    const {register, formState, handleSubmit} = useForm<OptionItemFormType>({mode: 'onChange'})
    const {isSubmitting, errors, isValid} = formState;

    const addOptionItem = async (postData: OptionItemFormType): Promise<void> => {
        try {
            const {data, error} = await createOptionItem({
                ...postData,
                amount: Number(postData.amount),
                percent: Number(postData.percent),
                option_id: option.id
            });
            if (error) {
                toast.error('Add option item has failed !');
            } else {
                toast.success(`The option item ${data.name} has been added !`);
                handleClose(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const editOptionItem = async (patchData: OptionItemFormType): Promise<void> => {
        try {
            const {data, error} = await updateOptionItem({
                ...patchData,
                amount: Number(patchData.amount),
                percent: Number(patchData.percent)
            }, optionItem.id);
            if (error) {
                toast.error('Edit option item has failed !');
            } else {
                toast.success(`The option item ${data.name} has been edited !`);
                handleClose(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <HeaderFormModal
                title={optionItem ? 'Edit an option item and his translations' : 'Add an option item'}
                handleClose={handleClose}
            />
            <form onSubmit={handleSubmit(optionItem ? editOptionItem : addOptionItem)}
                  className={classes.form}>
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <InputLabel htmlFor="name">Name of the option item</InputLabel>
                    <Input
                        type="text"
                        className="input-group"
                        name="name"
                        defaultValue={optionItem ? option?.name : null}
                        placeholder={'Name of the Option item'}
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
                        defaultValue={optionItem ? optionItem?.amount : null}
                        placeholder={'Amount of the Option item'}
                        id="amount-input"
                        {...register('amount')}
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
                        defaultValue={optionItem ? optionItem?.percent : null}
                        placeholder={'Percent of the Option item'}
                        id="percent-input"
                        {...register('percent')}
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
                    {optionItem ? 'Edit' : 'Create'}
                </Button>
            </form>
        </>
    )
}

export default FormOptionItem;
