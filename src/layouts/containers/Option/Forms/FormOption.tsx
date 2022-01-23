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
import {OptionModel} from '../../../../core/models/option/option.model';
import {createOption, updateOption} from '../../../../core/service/option/option.service';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

type OptionFormType = {
    name: string;
    multiple: string;
}

interface IAddOptionProps {
    option?: OptionModel | null;
    handleClose: (updated?: boolean) => void;
}

const useStyles = makeStyles(() => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}))

const FormOption: React.FC<IAddOptionProps> = ({
                                                          option,
                                                          handleClose
                                                      }) => {
    const classes = useStyles();
    const {register, formState, handleSubmit} = useForm<OptionFormType>({mode: 'onChange'})
    const {isSubmitting, errors, isValid} = formState;

    const addOption = async (postData: OptionFormType): Promise<void> => {
        try {
            const {data, error} = await createOption({...postData});
            if (error) {
                toast.error('Add option has failed !');
            } else {
                toast.success(`The option ${data.name} has been added !`);
                handleClose(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const editOption = async (patchData: OptionFormType): Promise<void> => {
        try {
            const {data, error} = await updateOption(patchData, option.id);
            if (error) {
                toast.error('Edit option has failed !');
            } else {
                toast.success(`The option ${data.name} has been edited !`);
                handleClose(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <HeaderFormModal
                title={option ? 'Edit an option and his translations' : 'Add an option'}
                handleClose={handleClose}
            />
            <form onSubmit={handleSubmit(option ? editOption : addOption)}
                  className={classes.form}>
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <InputLabel htmlFor="name">Name of the option</InputLabel>
                    <Input
                        type="text"
                        className="input-group"
                        name="name"
                        defaultValue={option ? option?.name : null}
                        placeholder={'Name of the Option'}
                        id="name-input"
                        {...register('name', {required: 'This field is required.'})}
                        error={!!errors.name}
                    />
                    {errors.name && <ErrorInputForm errorMessage={errors.name.message}/>}
                </FormControl>
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <InputLabel id="demo-simple-select-label">Multiple ?</InputLabel>
                    <Select
                        labelId="select-label-multiple"
                        id="select-multiple"
                        label="Multiple"
                        name="multiple"
                        defaultValue={option ? String(option.multiple) : null}
                        {...register('multiple')}
                    >
                        <MenuItem value={'true'}>Yes</MenuItem>
                        <MenuItem value={'false'}>No</MenuItem>
                    </Select>
                    {errors.multiple && <ErrorInputForm errorMessage={errors.multiple.message}/>}
                </FormControl>
                <Button
                    sx={{marginTop: '1rem'}}
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting || !isValid}
                >
                    {option ? 'Edit' : 'Create'}
                </Button>
            </form>
        </>
    )
}

export default FormOption;
