import {FormControl} from '@mui/material';
import React from 'react';
import {makeStyles} from '@mui/styles';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import {useForm} from 'react-hook-form';
import {toast} from 'react-toastify';
import ErrorInputForm from '../../../components/Errors/ErrorInputForm/ErrorInputForm';
import {TranslationModel} from '../../../../core/models/translation/translation.model';
import {OptionModel} from '../../../../core/models/option/option.model';
import {OptionTranslationModel} from '../../../../core/models/option/option-translation.model';
import {createOptionTranslation, updateOptionTranslation} from '../../../../core/service/option/optionTranslation.service';

type OptionTranslationFormType = {
    name: string;
}

interface IFormOptionTranslation {
    option: OptionModel;
    optionTranslation?: OptionTranslationModel;
    translationSelected: TranslationModel;
}

const useStyles = makeStyles(() => ({
    form: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: '2rem'
    },
}))

const FormOptionTranslation: React.FC<IFormOptionTranslation> = ({
                                                                     option,
                                                                     optionTranslation,
                                                                     translationSelected
                                                                 }) => {
    const classes = useStyles();
    const {register, formState, handleSubmit} = useForm<OptionTranslationFormType>({mode: 'onChange'})
    const {isSubmitting, errors, isValid} = formState;

    const addOptionTranslation = async (postData: OptionTranslationFormType): Promise<void> => {
        try {
            const {error} = await createOptionTranslation({
                ...postData,
                translation_id: translationSelected.id,
                option_id: option.id
            });
            error
                ? toast.error('Add option translation has failed !')
                : toast.success(`The option ${option.name} has been translated in ${translationSelected.code} !`);
        } catch (error) {
            console.log(error);
        }
    };

    const editOptionTranslation = async (patchData: OptionTranslationFormType): Promise<void> => {
        try {
            const {error} = await updateOptionTranslation({...patchData}, optionTranslation.id);
            error
                ? toast.error(`Edit the option ${option.name} in ${translationSelected.code} has failed !`)
                : toast.success(`The option ${option.name} has been edited in ${translationSelected.code} !`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(optionTranslation ? editOptionTranslation : addOptionTranslation)}
                  className={classes.form}>
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <Input
                        type="text"
                        className="input-group"
                        name="name"
                        defaultValue={optionTranslation ? optionTranslation?.name : null}
                        id="name-input"
                        {...register('name')}
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
                    {optionTranslation ? 'Edit' : 'Create'}
                </Button>
            </form>
        </>
    )
}

export default FormOptionTranslation;
