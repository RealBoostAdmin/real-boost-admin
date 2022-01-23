import {FormControl} from '@mui/material';
import React from 'react';
import {makeStyles} from '@mui/styles';
import Button from '@mui/material/Button';
import {useForm} from 'react-hook-form';
import {toast} from 'react-toastify';
import {TranslationModel} from '../../../../core/models/translation/translation.model';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import FormLabel from '@mui/material/FormLabel';
import DraftEditor from '../../../components/DraftEditor/DraftEditor';
import {ProfileTranslationModel} from "../../../../core/models/profile/profile-translation.model";
import {ProfileModel} from "../../../../core/models/profile/profile.model";
import {
    createProfileTranslation,
    updateProfileTranslation
} from "../../../../core/service/profile/profileTranslation.service";

type ProfileTranslationFormType = {
    description: string;
}

interface IFormProfileTranslation {
    profile: ProfileModel;
    profileTranslation?: ProfileTranslationModel;
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
    labelDescription: {
        fontWeight: '700 !important'
    }
}))

const FormProfileTranslation: React.FC<IFormProfileTranslation> = ({
                                                                 profile,
                                                                 profileTranslation,
                                                                 translationSelected
                                                             }) => {
    const classes = useStyles();
    const {formState, handleSubmit, setValue} = useForm<ProfileTranslationFormType>({mode: 'onChange'})
    const {isSubmitting, isValid} = formState;

    const addProfileTranslation = async (postData: ProfileTranslationFormType): Promise<void> => {
        try {
            const {error} = await createProfileTranslation({...postData}, translationSelected.id, profile.id);
            error
                ? toast.error('Add profile translation has failed !')
                : toast.success(`The profile has been translated in ${translationSelected.code} !`);
        } catch (error) {
            console.log(error);
        }
    };

    const editProfileTranslation = async (patchData: ProfileTranslationFormType): Promise<void> => {
        try {
            const {error} = await updateProfileTranslation({...patchData}, profileTranslation.id);
            error
                ? toast.error(`Edit the profile  in ${translationSelected.code} has failed !`)
                : toast.success(`The profile has been edited in ${translationSelected.code} !`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(profileTranslation ? editProfileTranslation : addProfileTranslation)}
                  className={classes.form}>
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <FormLabel className={classes.labelDescription} htmlFor="description">Description</FormLabel>
                    <DraftEditor name={"description"} contentEditor={profileTranslation?.description} setValue={setValue}/>
                </FormControl>
                <Button
                    sx={{marginTop: '1rem'}}
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting || !isValid}
                >
                    {profileTranslation ? 'Edit' : 'Create'}
                </Button>
            </form>
        </>
    )
}

export default FormProfileTranslation;
