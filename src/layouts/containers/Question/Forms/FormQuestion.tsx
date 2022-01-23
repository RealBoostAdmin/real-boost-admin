import {FormControl} from '@mui/material';
import React from 'react';
import {makeStyles} from '@mui/styles';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import {useForm} from 'react-hook-form';
import HeaderFormModal from '../../../components/Forms/HeaderFormModal/HeaderFormModal';
import {toast} from 'react-toastify';
import ErrorInputForm from '../../../components/Errors/ErrorInputForm/ErrorInputForm';
import {QuestionModel} from '../../../../core/models/question/question.model';
import {createQuestion, updateQuestion} from '../../../../core/service/question/question.service';

type QuestionFormType = {
    name: string;
}

interface IAddQuestionProps {
    question?: QuestionModel | null;
    handleClose: (updated?: boolean) => void;
}

const useStyles = makeStyles(() => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}))

const FormQuestion: React.FC<IAddQuestionProps> = ({
                                                       question,
                                                       handleClose
                                                   }) => {
    const classes = useStyles();
    const {register, formState, handleSubmit} = useForm<QuestionFormType>({mode: 'onChange'})
    const {isSubmitting, errors, isValid} = formState;

    const addQuestion = async (postData: QuestionFormType): Promise<void> => {
        try {
            const {data, error} = await createQuestion({...postData});
            if (error) {
                toast.error('Add question has failed !');
            } else {
                toast.success(`The question ${data.name} has been added !`);
                handleClose(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const editQuestion = async (patchData: QuestionFormType): Promise<void> => {
        try {
            const {data, error} = await updateQuestion(patchData, question.id);
            if (error) {
                toast.error('Edit question has failed !');
            } else {
                toast.success(`The question ${data.name} has been edited !`);
                handleClose(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <HeaderFormModal
                title={question ? 'Edit a question and his translations' : 'Add a question'}
                handleClose={handleClose}
            />
            <form onSubmit={handleSubmit(question ? editQuestion : addQuestion)}
                  className={classes.form}>
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <InputLabel htmlFor="name">Name of the question</InputLabel>
                    <Input
                        type="text"
                        className="input-group"
                        name="name"
                        defaultValue={question ? question?.name : null}
                        placeholder={'Name of Question'}
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
                    {question ? 'Edit' : 'Create'}
                </Button>
            </form>
        </>
    )
}

export default FormQuestion;
