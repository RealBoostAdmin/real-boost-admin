import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {TranslationSelected} from '../../../../core/store/translation/translation.selector';
import {toast} from 'react-toastify';
import HeadSection from '../../../components/HeadSection/HeadSection';
import {useParams} from 'react-router';
import Paper from '@mui/material/Paper';
import FormQuestionTranslation from '../Forms/FormQuestionTranslation';
import {QuestionTranslationModel} from '../../../../core/models/question/question-translation.model';
import {QuestionModel} from '../../../../core/models/question/question.model';
import {getQuestion} from '../../../../core/service/question/question.service';
import {getQuestionTranslation} from '../../../../core/service/question/questionTranslation.service';

const QuestionTranslationPage: React.FC = () => {
    const translationSelected = useSelector(TranslationSelected);
    const [questionTranslation, setQuestionTranslation] = useState<QuestionTranslationModel>();
    const [question, setQuestion] = useState<QuestionModel>();
    const {questionId} = useParams();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchQuestionAndTranslation = async () => {
            try {
                setLoading(true);
                const {data, error} = await getQuestion(questionId);
                error
                    ? toast.error(`Loading of question failed !`)
                    : setQuestion(data);
                const {dataTranslation, errorTranslation} = await getQuestionTranslation(questionId, translationSelected.id);
                errorTranslation
                    ? toast.error(`Loading of question translation data in ${translationSelected.code} failed !`)
                    : setQuestionTranslation(dataTranslation[0]);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchQuestionAndTranslation();
    }, [setQuestion, translationSelected])

    return (
        <>
            {(!loading && !!question && !!translationSelected) &&
            <Paper sx={{paddingBottom: '2rem'}}>
                <HeadSection
                    title={questionTranslation ? `Edit ${question?.name} in ${translationSelected.code}` : `Add ${question?.name} in ${translationSelected.code}`}
                    back={true}
                />
                <FormQuestionTranslation
                    question={question}
                    questionTranslation={questionTranslation}
                    translationSelected={translationSelected}
                />
            </Paper>
            }
        </>
    )
}

export default QuestionTranslationPage;
