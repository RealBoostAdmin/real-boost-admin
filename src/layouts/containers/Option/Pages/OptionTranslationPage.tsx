import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {TranslationSelected} from '../../../../core/store/translation/translation.selector';
import {toast} from 'react-toastify';
import HeadSection from '../../../components/HeadSection/HeadSection';
import {useParams} from 'react-router';
import Paper from '@mui/material/Paper';
import {OptionModel} from '../../../../core/models/option/option.model';
import {OptionTranslationModel} from '../../../../core/models/option/option-translation.model';
import {getOption} from '../../../../core/service/option/option.service';
import {getOptionTranslation} from '../../../../core/service/option/optionTranslation.service';
import FormOptionTranslation from '../Forms/FormOptionTranslation';
import {getOptionItems} from '../../../../core/service/option/optionItem.service';
import {OptionItemModel} from '../../../../core/models/option/option-item.model';
import OptionItem from '../OptionItem/OptionItem';

const OptionTranslationPage: React.FC = () => {
    const translationSelected = useSelector(TranslationSelected);
    const [optionTranslation, setOptionTranslation] = useState<OptionTranslationModel>();
    const [optionItems, setOptionItems] = useState<OptionItemModel[]>();
    const [option, setOption] = useState<OptionModel>();
    const [date, setDate] = useState<Date>(new Date());
    const {optionId} = useParams();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchOptionAndTranslation = async () => {
            try {
                setLoading(true);
                const {data, error} = await getOption(optionId);
                error
                    ? toast.error(`Loading of option failed !`)
                    : setOption(data);
                const {dataTranslation, errorTranslation} = await getOptionTranslation(optionId, translationSelected.id);
                errorTranslation
                    ? toast.error(`Loading of option translation data in ${translationSelected.code} failed !`)
                    : setOptionTranslation(dataTranslation[0]);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchOptionAndTranslation();
    }, [setOption, translationSelected])

    useEffect(() => {
        const fetchOptionItems = async () => {
            try {
                setLoading(true);
                const {data, error} = await getOptionItems(optionId);
                error
                    ? toast.error(`Loading of option items failed !`)
                    : setOptionItems(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchOptionItems();
    }, [setOptionItems, date])

    return (
        <>
            {(!loading && !!option && !!translationSelected) &&
            <>
                <Paper sx={{paddingBottom: '2rem'}}>
                    <HeadSection
                        title={optionTranslation ? `Edit ${option?.name} in ${translationSelected.code}` : `Add ${option?.name} in ${translationSelected.code}`}
                        back={true}
                    />
                    <FormOptionTranslation
                        option={option}
                        optionTranslation={optionTranslation}
                        translationSelected={translationSelected}
                    />
                </Paper>
                <OptionItem option={option} optionItems={optionItems} setDate={setDate}/>
            </>
            }
        </>
    )
}

export default OptionTranslationPage;
