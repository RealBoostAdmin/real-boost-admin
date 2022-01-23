import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import {useParams} from 'react-router';
import Paper from '@mui/material/Paper';
import {ExtraModel} from '../../../../core/models/extra/extra.model';
import {TranslationSelected} from '../../../../core/store/translation/translation.selector';
import HeadSection from '../../../components/HeadSection/HeadSection';
import {ExtraTranslationModel} from '../../../../core/models/extra/extra-translation.model';
import {getExtra} from '../../../../core/service/extra/extra.service';
import FormExtraTranslation from '../Forms/FormExtraTranslation';
import {getExtraTranslation} from '../../../../core/service/extra/extraTranslation.service';

const ExtraTranslationPage: React.FC = () => {
    const translationSelected = useSelector(TranslationSelected);
    const [extraTranslation, setExtraTranslation] = useState<ExtraTranslationModel>();
    const [extra, setExtra] = useState<ExtraModel>();
    const {extraId} = useParams();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchExtraAndTranslation = async () => {
            try {
                setLoading(true);
                const {data, error} = await getExtra(extraId);
                error
                    ? toast.error(`Loading of extra failed !`)
                    : setExtra(data);
                const {dataTranslation, errorTranslation} = await getExtraTranslation(extraId, translationSelected.id);
                errorTranslation
                    ? toast.error(`Loading of extra translation data in ${translationSelected.code} failed !`)
                    : setExtraTranslation(dataTranslation[0]);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchExtraAndTranslation();
    }, [setExtra, translationSelected])

    return (
        <>
            {(!loading && !!extra && !!translationSelected) &&
            <Paper sx={{paddingBottom: '2rem'}}>
                <HeadSection
                    title={extraTranslation ? `Edit ${extra?.name} in ${translationSelected.code}` : `Add ${extra?.name} in ${translationSelected.code}`}
                    back={true}
                />
                <FormExtraTranslation
                    extra={extra}
                    extraTranslation={extraTranslation}
                    translationSelected={translationSelected}
                />
            </Paper>
            }
        </>
    )
}

export default ExtraTranslationPage;
