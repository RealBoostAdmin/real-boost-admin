import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {TranslationSelected} from '../../../../core/store/translation/translation.selector';
import {toast} from 'react-toastify';
import HeadSection from '../../../components/HeadSection/HeadSection';
import {useParams} from 'react-router';
import Paper from '@mui/material/Paper';
import {ProfileModel} from "../../../../core/models/profile/profile.model";
import {ProfileTranslationModel} from "../../../../core/models/profile/profile-translation.model";
import {getProfileTranslation} from "../../../../core/service/profile/profileTranslation.service";
import {getProfile} from "../../../../core/service/profile/profile.service";
import FormProfileTranslation from "../Forms/FormProfileTranslation";

const ProfileTranslationPage: React.FC = () => {
    const translationSelected = useSelector(TranslationSelected);
    const [profileTranslation, setProfileTranslation] = useState<ProfileTranslationModel>();
    const [profile, setProfile] = useState<ProfileModel>();
    const {profileId} = useParams();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProfileAndTranslation = async () => {
            try {
                setLoading(true);
                const {data, error} = await getProfile(profileId);
                error
                    ? toast.error(`Loading of question failed !`)
                    : setProfile(data);
                const {dataTranslation, errorTranslation} = await getProfileTranslation(profileId, translationSelected.id);
                errorTranslation
                    ? toast.error(`Loading of question translation data in ${translationSelected.code} failed !`)
                    : setProfileTranslation(dataTranslation[0]);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchProfileAndTranslation();
    }, [setProfile, translationSelected])

    return (
        <>
            {(!loading && !!profile && !!translationSelected) &&
            <Paper sx={{paddingBottom: '2rem'}}>
                <HeadSection
                    title={profileTranslation ? `Edit profile in ${translationSelected.code}` : `Add profile translation in ${translationSelected.code}`}
                    back={true}
                />
                <FormProfileTranslation
                    profile={profile}
                    profileTranslation={profileTranslation}
                    translationSelected={translationSelected}
                />
            </Paper>
            }
        </>
    )
}

export default ProfileTranslationPage;
