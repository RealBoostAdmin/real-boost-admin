import {FormControl} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {makeStyles} from '@mui/styles';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import {useForm} from 'react-hook-form';
import {createLanguage, updateLanguage} from '../../../../core/service/language/language.service';
import {useSelector} from 'react-redux';
import {Translations} from '../../../../core/store/translation/translation.selector';
import {LanguageModel, LanguageRelations} from '../../../../core/models/language/language.model';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {TranslationModel} from '../../../../core/models/translation/translation.model';
import {getCountries} from '../../../../core/service/country/country.service';
import {CountryModel} from '../../../../core/models/country/country.model';
import HeaderFormModal from '../../../components/Forms/HeaderFormModal/HeaderFormModal';
import {toast} from 'react-toastify';
import ErrorInputForm from '../../../components/Errors/ErrorInputForm/ErrorInputForm';

type LanguageFormType = {
    name: string;
}

interface IAddLanguageProps {
    language?: LanguageModel | null;
    handleClose: (updated?: boolean) => void;
}

const useStyles = makeStyles(() => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}))

const FormLanguage: React.FC<IAddLanguageProps> = ({
                                                          language,
                                                          handleClose
                                                      }) => {
    const classes = useStyles();
    const {register, formState, handleSubmit} = useForm<LanguageFormType>({mode: 'onChange'})
    const {isSubmitting, errors, isValid} = formState;
    const translations = useSelector(Translations);
    const [countries, setCountries] = useState<CountryModel[]>([]);
    const [selectedRelation, setSelectedRelation] = useState<LanguageRelations>(
        language ? {translation: language.translation, country: language.country} : null
    );

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const {data, error} = await getCountries();
                error
                    ? console.log('Load of countries datas failed !')
                    : setCountries(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCountries();
    }, [setCountries])

    const addLanguage = async (postLanguage: LanguageFormType): Promise<void> => {
        try {
            const {error} = await createLanguage({
                ...postLanguage,
                translation_id: selectedRelation.translation.id,
                country_id: selectedRelation.country.id
            });
            if (error) {
                toast.error('Add language has failed !');
            } else {
                toast.success('The language has been added.');
                handleClose(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const editLanguage = async (patchLanguage: LanguageFormType): Promise<void> => {
        try {
            const {error} = await updateLanguage(patchLanguage, selectedRelation);
            if (error) {
                toast.error('Edit language has failed !');
            } else {
                toast.success('The language has been edited.');
                handleClose(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <HeaderFormModal
                title={language ? 'Edit a language' : 'Add a language'}
                handleClose={handleClose}
            />
            <form onSubmit={handleSubmit(language ? editLanguage : addLanguage)} className={classes.form}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Choose a country</InputLabel>
                    <Select
                        labelId="select-label-country"
                        id="select-country"
                        label="Country"
                        defaultValue={language ? language.country.name : null}
                    >
                        {countries.length !== 0 && countries.map((country: CountryModel) =>
                            <MenuItem
                                key={country.name}
                                value={country.name}
                                onClick={() => setSelectedRelation({...selectedRelation, country: country})}
                            >
                                {country.name}
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Choose a translation</InputLabel>
                    <Select
                        labelId="select-label-code"
                        id="select-code"
                        label="Code"
                        defaultValue={language ? language.translation.code : null}
                    >
                        {translations.length !== 0 && translations.map((translation: TranslationModel) =>
                            <MenuItem
                                key={translation.code}
                                value={translation.code}
                                onClick={() => setSelectedRelation({...selectedRelation, translation: translation})}
                            >
                                {translation.code}
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <Input
                        type="text"
                        className="input-group"
                        name="name"
                        defaultValue={language ? language.name : null}
                        placeholder={'Name of language'}
                        id="name-input"
                        {...register('name', {required: 'This field is required.'})}
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
                    {language ? 'Edit' : 'Create'}
                </Button>
            </form>
        </>
    )
}

export default FormLanguage;
