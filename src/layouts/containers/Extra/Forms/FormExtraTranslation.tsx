import {FormControl} from '@mui/material';
import React from 'react';
import {makeStyles} from '@mui/styles';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import {useForm} from 'react-hook-form';
import {toast} from 'react-toastify';
import ErrorInputForm from '../../../components/Errors/ErrorInputForm/ErrorInputForm';
import {ExtraModel} from '../../../../core/models/extra/extra.model';
import {TranslationModel} from '../../../../core/models/translation/translation.model';
import {ExtraTranslationModel} from '../../../../core/models/extra/extra-translation.model';
import {createExtraTranslation, updateExtraTranslation} from '../../../../core/service/extra/extraTranslation.service';

type ExtraTranslationFormType = {
    name: string;
}

interface IFormExtraTranslation {
    extra: ExtraModel;
    extraTranslation?: ExtraTranslationModel;
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

const FormExtraTranslation: React.FC<IFormExtraTranslation> = ({
                                                                   extra,
                                                                   extraTranslation,
                                                                   translationSelected
                                                               }) => {
    const classes = useStyles();
    const {register, formState, handleSubmit} = useForm<ExtraTranslationFormType>({mode: 'onChange'})
    const {isSubmitting, errors, isValid} = formState;

    const addExtraTranslation = async (postData: ExtraTranslationFormType): Promise<void> => {
        try {
            const {error} = await createExtraTranslation({
                ...postData,
                translation_id: translationSelected.id,
                extra_id: extra.id
            });
            error
                ? toast.error('Add extra translation has failed !')
                : toast.success(`The extra ${extra.name} has been translated in ${translationSelected.code} !`);
        } catch (error) {
            console.log(error);
        }
    };

    const editExtraTranslation = async (patchData: ExtraTranslationFormType): Promise<void> => {
        try {
            const {error} = await updateExtraTranslation({...patchData}, extraTranslation.id);
            error
                ? toast.error(`Edit the extra ${extra.name} in ${translationSelected.code} has failed !`)
                : toast.success(`The extra ${extra.name} has been edited in ${translationSelected.code} !`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(extraTranslation ? editExtraTranslation : addExtraTranslation)}
                  className={classes.form}>
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <Input
                        type="text"
                        className="input-group"
                        name="name"
                        defaultValue={extraTranslation ? extraTranslation?.name : null}
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
                    {extraTranslation ? 'Edit' : 'Create'}
                </Button>
            </form>
        </>
    )
}

export default FormExtraTranslation;
