import {FormControl, TextareaAutosize} from '@mui/material';
import React from 'react';
import {makeStyles} from '@mui/styles';
import Button from '@mui/material/Button';
import {useForm} from 'react-hook-form';
import HeaderFormModal from '../../../components/Forms/HeaderFormModal/HeaderFormModal';
import {toast} from 'react-toastify';
import ErrorInputForm from '../../../components/Errors/ErrorInputForm/ErrorInputForm';
import {useSelector} from "react-redux";
import {UserAuthenticated} from "../../../../core/store/auth/auth.selector";
import {DisputeMessageModel} from "../../../../core/models/dispute_message/dispute_message.model";
import {
    createDisputeMessage,
    updateDisputeMessage
} from "../../../../core/service/dispute_message/dispute_message.service";
import {DisputeModel, DisputeState} from "../../../../core/models/dispute/dispute.model";
import {updateDispute} from "../../../../core/service/dispute/dispute.service";

type DisputeMessageFormType = {
    content: string;
}

interface IAddDisputeMessageProps {
    dispute: DisputeModel;
    message?: DisputeMessageModel | null;
    setDate: () => void;
    handleClose: () => void;
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

const FormDisputeMessage: React.FC<IAddDisputeMessageProps> = ({
                                                                   dispute,
                                                                   message,
                                                                   setDate,
                                                                   handleClose
                                                               }) => {
    const classes = useStyles();
    const {register, formState, handleSubmit} = useForm<DisputeMessageFormType>({mode: 'onChange'})
    const {isSubmitting, errors, isValid} = formState;
    const userAuthenticated = useSelector(UserAuthenticated)

    const addDisputeMessage = async (postData: DisputeMessageFormType): Promise<void> => {
        try {
            const {error} = await createDisputeMessage({
                ...postData,
                user_id: userAuthenticated.id,
                dispute_id: dispute.id,
                deleted: 0
            });
            if (error) {
                toast.error('Add message has failed !');
            } else {
                toast.success(`The message has been added !`);
                if (dispute.state === DisputeState.OPEN) await updateDispute({state: DisputeState.PENDING}, dispute.id)
                setDate();
                handleClose();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const editDisputeMessage = async (patchData: DisputeMessageFormType): Promise<void> => {
        try {
            const {error} = await updateDisputeMessage(patchData, message.id);
            if (error) {
                toast.error('Edit message has failed !');
            } else {
                toast.success(`The message has been edited !`);
                setDate();
                handleClose();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <HeaderFormModal
                title={message ? 'Edit a message' : 'Add a message'}
                handleClose={handleClose}
            />
            <form onSubmit={handleSubmit(message ? editDisputeMessage : addDisputeMessage)}
                  className={classes.form}>
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <TextareaAutosize
                        className={classes.labelDescription}
                        minRows={3}
                        placeholder="Content of message"
                        style={{width: 200}}
                        defaultValue={message ? message.content : null}
                        {...register('content', {required: 'This field is required.'})}
                    />
                    {errors.content && <ErrorInputForm errorMessage={errors.content.message}/>}
                </FormControl>
                <Button
                    sx={{marginTop: '1rem'}}
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting || !isValid}
                >
                    {message ? 'Edit' : 'Create'}
                </Button>
            </form>
        </>
    )
}

export default FormDisputeMessage;
