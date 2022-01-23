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
import {MissionModel} from '../../../../core/models/mission/mission.model';
import {createReview, updateReview} from '../../../../core/service/review/review.service';
import FormLabel from '@mui/material/FormLabel';
import DraftEditor from '../../../components/DraftEditor/DraftEditor';

type ReviewFormType = {
    content?: string;
    rating?: number;
}

interface IAddReviewProps {
    mission: MissionModel;
    setDate: (date: Date) => void;
}

const useStyles = makeStyles(() => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    labelDescription: {
        fontWeight: '700 !important'
    }
}))

const FormReview: React.FC<IAddReviewProps> = ({
                                                   mission,
                                                   setDate
                                               }) => {
    const classes = useStyles();
    const {register, formState, handleSubmit, setValue} = useForm<ReviewFormType>({mode: 'onChange'})
    const {isSubmitting, errors, isValid} = formState;

    const addReview = async (postData: ReviewFormType): Promise<void> => {
        try {
            const {error} = await createReview({...postData, mission_id: mission.id});
            if (error) {
                toast.error('Add review has failed !')
            } else {
                toast.success(`The review of mission ${mission.code} has been added !`);
                setDate(new Date());
            }
        } catch (error) {
            console.log(error);
        }
    }

    const editReview = async (patchData: ReviewFormType): Promise<void> => {
        try {
            const {error} = await updateReview(patchData, mission.review.id);
            error
                ? toast.error('Edit review has failed !')
                : toast.success(`The review of mission ${mission.code} has been edited !`);
            if (error) {
                toast.error('Edit review has failed !');
            } else {
                toast.success(`The review of mission ${mission.code} has been edited !`);
                setDate(new Date());
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <HeaderFormModal
                title={mission.review ? 'Edit a review' : 'Add a review'}
            />
            <form onSubmit={handleSubmit(mission.review ? editReview : addReview)} className={classes.form}>
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <FormLabel className={classes.labelDescription} htmlFor="description">Content</FormLabel>
                    <DraftEditor name={"content"} contentEditor={mission?.review?.content} setValue={setValue}/>
                </FormControl>
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <InputLabel htmlFor="rating">Rating</InputLabel>
                    <Input
                        type="number"
                        className="input-group"
                        name="rating"
                        defaultValue={mission.review ? mission.review?.rating : null}
                        placeholder={'Rating'}
                        id="rating"
                        {...register('rating', {required: 'This field is required.', min: 1, max: 5, valueAsNumber: true})}
                        error={!!errors.rating}
                    />
                    {errors.rating && <ErrorInputForm errorMessage={errors.rating.message}/>}
                </FormControl>
                <Button
                    sx={{marginTop: '1rem'}}
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting || !isValid}
                >
                    {mission.review ? 'Edit' : 'Create'}
                </Button>
            </form>
        </>
    )
}

export default FormReview;
