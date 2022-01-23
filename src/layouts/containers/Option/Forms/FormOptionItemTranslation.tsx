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
import {OptionItemModel} from '../../../../core/models/option/option-item.model';
import {OptionItemTranslationModel} from '../../../../core/models/option/option-item-translation.model';
import {
    createOptionItemTranslation,
    updateOptionItemTranslation
} from '../../../../core/service/option/optionItemTranslation.service';

type OptionItemTranslationFormType = {
    label: string;
}

interface IFormOptionItemTranslation {
    optionItem: OptionItemModel;
    optionItemTranslation?: OptionItemTranslationModel;
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

const FormOptionItemTranslation: React.FC<IFormOptionItemTranslation> = ({
                                                                             optionItem,
                                                                             optionItemTranslation,
                                                                             translationSelected
                                                                         }) => {
    const classes = useStyles();
    const {register, formState, handleSubmit} = useForm<OptionItemTranslationFormType>({mode: 'onChange'})
    const {isSubmitting, errors, isValid} = formState;

    const addOptionItemTranslation = async (postData: OptionItemTranslationFormType): Promise<void> => {
        try {
            const {error} = await createOptionItemTranslation({
                ...postData,
                translation_id: translationSelected.id,
                option_item_id: optionItem.id
            });
            error
                ? toast.error('Add option translation has failed !')
                : toast.success(`The option ${optionItem.name} has been translated in ${translationSelected.code} !`);
        } catch (error) {
            console.log(error);
        }
    };

    const editOptionItemTranslation = async (patchData: OptionItemTranslationFormType): Promise<void> => {
        try {
            const {error} = await updateOptionItemTranslation({...patchData}, optionItemTranslation.id);
            error
                ? toast.error(`Edit the option ${optionItem.name} in ${translationSelected.code} has failed !`)
                : toast.success(`The option ${optionItem.name} has been edited in ${translationSelected.code} !`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(optionItemTranslation ? editOptionItemTranslation : addOptionItemTranslation)}
                  className={classes.form}>
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <InputLabel htmlFor="label">Label</InputLabel>
                    <Input
                        type="text"
                        className="input-group"
                        name="label"
                        defaultValue={optionItemTranslation ? optionItemTranslation?.label : null}
                        id="label-input"
                        {...register('label')}
                        error={!!errors.label}
                    />
                    {errors.label && <ErrorInputForm errorMessage={errors.label.message}/>}
                </FormControl>
                <Button
                    sx={{marginTop: '1rem'}}
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting || !isValid}
                >
                    {optionItemTranslation ? 'Edit' : 'Create'}
                </Button>
            </form>
        </>
    )
}

export default FormOptionItemTranslation;
