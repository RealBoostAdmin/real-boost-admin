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
import {QuestionModel} from '../../../../core/models/question/question.model';
import {QuestionTranslationModel} from '../../../../core/models/question/question-translation.model';
import {
    createQuestionTranslation,
    updateQuestionTranslation
} from '../../../../core/service/question/questionTranslation.service';
import DraftEditor from '../../../components/DraftEditor/DraftEditor';
import FormLabel from '@mui/material/FormLabel';

type QuestionTranslationFormType = {
    title: string;
    content: string
}

interface IFormQuestionTranslation {
    question: QuestionModel;
    questionTranslation?: QuestionTranslationModel;
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
    labelContent: {
        fontWeight: '700 !important'
    }}))

const FormQuestionTranslation: React.FC<IFormQuestionTranslation> = ({
                                                                 question,
                                                                 questionTranslation,
                                                                 translationSelected
                                                             }) => {
    const classes = useStyles();
    const {register, formState, handleSubmit, setValue} = useForm<QuestionTranslationFormType>({mode: 'onChange'})
    const {isSubmitting, errors, isValid} = formState;

    const addQuestionTranslation = async (postData: QuestionTranslationFormType): Promise<void> => {
        try {
            const {error} = await createQuestionTranslation({...postData}, translationSelected.id, question.id);
            error
                ? toast.error('Add question translation has failed !')
                : toast.success(`The question ${question.name} has been translated in ${translationSelected.code} !`);
        } catch (error) {
            console.log(error);
        }
    };

    const editQuestionTranslation = async (patchData: QuestionTranslationFormType): Promise<void> => {
        try {
            const {error} = await updateQuestionTranslation({...patchData}, questionTranslation.id);
            error
                ? toast.error(`Edit the question ${question.name} in ${translationSelected.code} has failed !`)
                : toast.success(`The question ${question.name} has been edited in ${translationSelected.code} !`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(questionTranslation ? editQuestionTranslation : addQuestionTranslation)}
                  className={classes.form}>
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <InputLabel htmlFor="title">Title</InputLabel>
                    <Input
                        type="text"
                        className="input-group"
                        name="title"
                        defaultValue={questionTranslation ? questionTranslation?.title : null}
                        id="title-input"
                        {...register('title')}
                        error={!!errors.title}
                    />
                    {errors.title && <ErrorInputForm errorMessage={errors.title.message}/>}
                </FormControl>
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <FormLabel className={classes.labelContent} htmlFor="content">Content</FormLabel>
                    <DraftEditor name={"content"} contentEditor={questionTranslation?.content} setValue={setValue}/>
                </FormControl>
                <Button
                    sx={{marginTop: '1rem'}}
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting || !isValid}
                >
                    {questionTranslation ? 'Edit' : 'Create'}
                </Button>
            </form>
        </>
    )
}

export default FormQuestionTranslation;
