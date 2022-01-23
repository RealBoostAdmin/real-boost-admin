import {FormControl, TextareaAutosize} from '@mui/material';
import React from 'react';
import {makeStyles} from '@mui/styles';
import Button from '@mui/material/Button';
import {useForm} from 'react-hook-form';
import HeaderFormModal from '../../../components/Forms/HeaderFormModal/HeaderFormModal';
import {toast} from 'react-toastify';
import ErrorInputForm from '../../../components/Errors/ErrorInputForm/ErrorInputForm';
import {ConversationModel, ConversationState} from "../../../../core/models/conversation/conversation.model";
import {ConversationMessageModel} from "../../../../core/models/conversation_message/conversation_message.model";
import {
    createConversationMessage,
    updateConversationMessage
} from "../../../../core/service/conversation_message/conversation_message.service";
import {useSelector} from "react-redux";
import {UserAuthenticated} from "../../../../core/store/auth/auth.selector";
import {updateConversation} from "../../../../core/service/conversation/conversation.service";

type ConversationMessageFormType = {
    content: string;
}

interface IAddConversationMessageProps {
    conversation: ConversationModel;
    message?: ConversationMessageModel | null;
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

const FormConversationMessage: React.FC<IAddConversationMessageProps> = ({
                                                                             conversation,
                                                                             message,
                                                                             setDate,
                                                                             handleClose
                                                                         }) => {
    const classes = useStyles();
    const {register, formState, handleSubmit} = useForm<ConversationMessageFormType>({mode: 'onChange'})
    const {isSubmitting, errors, isValid} = formState;
    const userAuthenticated = useSelector(UserAuthenticated)

    const addConversationMessage = async (postData: ConversationMessageFormType): Promise<void> => {
        try {
            const {error} = await createConversationMessage({
                ...postData,
                user_id: userAuthenticated.id,
                conversation_id: conversation.id,
                deleted: 0
            });
            if (error) {
                toast.error('Add message has failed !');
            } else {
                toast.success(`The message has been added !`);
                if (conversation.state === ConversationState.OPEN) await updateConversation({state: ConversationState.PENDING}, conversation.id)
                setDate();
                handleClose();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const editConversationMessage = async (patchData: ConversationMessageFormType): Promise<void> => {
        try {
            const {error} = await updateConversationMessage(patchData, message.id);
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
            <form onSubmit={handleSubmit(message ? editConversationMessage : addConversationMessage)}
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

export default FormConversationMessage;
