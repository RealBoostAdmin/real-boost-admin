import {FormControl} from '@mui/material';
import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import {useForm} from 'react-hook-form';
import {PatchTranslationModel, PostTranslationModel, TranslationModel} from '../../../../core/models/translation/translation.model';
import {useDispatch} from 'react-redux';
import {patchTranslationState, postTranslationState} from '../../../../core/store/translation/translation.actions';
import {createTranslation, updateTranslation} from '../../../../core/service/translation/translation.service';
import HeaderFormModal from '../../../components/Forms/HeaderFormModal/HeaderFormModal';
import './FormTranslation.scss';
import {toast} from 'react-toastify';
import ErrorInputForm from '../../../components/Errors/ErrorInputForm/ErrorInputForm';

type TranslationFormType = {
    code: string;
    flag: string;
}

interface TranslationFormProps {
    translation?: TranslationModel | null;
    handleClose: (updated?: boolean) => void;
}

const FormTranslation: React.FC<TranslationFormProps> = ({
                                                             translation,
                                                             handleClose
                                                         }) => {
    const {register, formState, handleSubmit} = useForm<TranslationFormType>({mode: 'onChange'})
    const {isSubmitting, errors, isValid} = formState;
    const dispatch = useDispatch();

    const addTranslation = async (postTranslation: PostTranslationModel): Promise<void> => {
        try {
            const {data, error} = await createTranslation(postTranslation);
            if (data.length !== 0) await dispatch(postTranslationState(data[0]));
            if (error) {
                toast.error('Add translation has failed !');
            } else {
                toast.success('The translation has been added.')
                handleClose(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const editTranslation = async (patchTranslation: PatchTranslationModel): Promise<void> => {
        try {
            const {data, error} = await updateTranslation(patchTranslation, translation.id);
            if (error) {
                toast.error('Edit translation has failed !');
            } else {
                if (data.length !== 0) await dispatch(patchTranslationState(data[0], translation.id));
                toast.success('The translation has been edited.')
                handleClose(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <HeaderFormModal
                title={translation ? 'Edit a translation' : 'Add a translation'}
                handleClose={handleClose}
            />
            <form onSubmit={handleSubmit(translation ? editTranslation : addTranslation)} className="form-translation">
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <InputLabel htmlFor="code">Code</InputLabel>
                    <Input
                        type="text"
                        className="input-group"
                        name="code"
                        placeholder={'Code of translation'}
                        id="code-input"
                        defaultValue={translation ? translation.code : null}
                        {...register('code', {
                            required: 'This field is required.',
                            maxLength: {value: 4, message: 'The max length of this field is 4'}
                        })}
                        error={!!errors.code}
                    />
                    {errors.code && <ErrorInputForm errorMessage={errors.code.message}/>}
                </FormControl>
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <InputLabel htmlFor="flag">Flag</InputLabel>
                    <Input
                        type="text"
                        className="input-group"
                        name="flag"
                        placeholder={'Flag of translation'}
                        id="flag-input"
                        defaultValue={translation ? translation.flag : null}
                        {...register('flag', {required: 'This field is required.'})}
                        error={!!errors.flag}
                    />
                    {errors.flag && <ErrorInputForm errorMessage={errors.flag.message}/>}
                </FormControl>
                <Button
                    sx={{marginTop: '1rem'}}
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting || !isValid}
                >
                    {translation ? 'Edit' : 'Create'}
                </Button>
            </form>
        </>
    )
}

export default FormTranslation;
