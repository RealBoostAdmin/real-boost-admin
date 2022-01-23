import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {TranslationSelected} from '../../../../core/store/translation/translation.selector';
import {toast} from 'react-toastify';
import HeadSection from '../../../components/HeadSection/HeadSection';
import {useParams} from 'react-router';
import Paper from '@mui/material/Paper';
import {OptionItemTranslationModel} from '../../../../core/models/option/option-item-translation.model';
import {OptionItemModel} from '../../../../core/models/option/option-item.model';
import {getOptionItem} from '../../../../core/service/option/optionItem.service';
import {getOptionItemTranslation} from '../../../../core/service/option/optionItemTranslation.service';
import FormOptionItemTranslation from '../Forms/FormOptionItemTranslation';

const OptionItemTranslationPage: React.FC = () => {
    const translationSelected = useSelector(TranslationSelected);
    const [optionItemTranslation, setOptionItemTranslation] = useState<OptionItemTranslationModel>();
    const [optionItem, setOptionItem] = useState<OptionItemModel>();
    const {optionItemId} = useParams();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchOptionAndTranslation = async () => {
            try {
                setLoading(true);
                const {data, error} = await getOptionItem(optionItemId);
                error
                    ? toast.error(`Loading of option item failed !`)
                    : setOptionItem(data);
                const {dataTranslation, errorTranslation} = await getOptionItemTranslation(optionItemId, translationSelected.id);
                errorTranslation
                    ? toast.error(`Loading of option item translation data in ${translationSelected.code} failed !`)
                    : setOptionItemTranslation(dataTranslation[0]);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchOptionAndTranslation();
    }, [setOptionItem, setOptionItemTranslation, translationSelected])

    return (
        <>
            {(!loading && !!optionItem && !!translationSelected) &&
            <Paper sx={{paddingBottom: '2rem'}}>
                <HeadSection
                    title={optionItemTranslation ? `Edit ${optionItem?.name} in ${translationSelected.code}` : `Add ${optionItem?.name} in ${translationSelected.code}`}
                    back={true}
                />
                <FormOptionItemTranslation
                    optionItem={optionItem}
                    optionItemTranslation={optionItemTranslation}
                    translationSelected={translationSelected}
                />
            </Paper>
            }
        </>
    )
}

export default OptionItemTranslationPage;
