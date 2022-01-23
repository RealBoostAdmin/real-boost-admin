import React, {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import HeadSection from '../../../../components/HeadSection/HeadSection';
import {MissionModel} from '../../../../../core/models/mission/mission.model';
import MyModal from '../../../../components/Modal/MyModal';
import {ConversationModel} from '../../../../../core/models/conversation/conversation.model';
import {
    getMessagesOfConversation, updateConversationMessage
} from '../../../../../core/service/conversation_message/conversation_message.service';
import {ConversationMessageModel} from '../../../../../core/models/conversation_message/conversation_message.model';
import {getConversationOfMission} from '../../../../../core/service/conversation/conversation.service';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import FormConversationMessage from '../../Forms/FormConversationMessage';
import {UserAuthenticated} from '../../../../../core/store/auth/auth.selector';
import {useSelector} from 'react-redux';
import Paper from '@mui/material/Paper';
import {supabase} from '../../../../../core/supabase/client';
import './chat.scss';
import {getDayMonthAndHour} from '../../../../../core/helpers/date/format-date.helper';

interface IPropsTabConversation {
    mission: MissionModel;
}

const TabConversation: React.FC<IPropsTabConversation> = ({mission}) => {
    const [conversation, setConversation] = useState<ConversationModel>()
    const [conversationMessages, setConversationMessages] = useState<ConversationMessageModel[]>();
    const [conversationMessage, setConversationMessage] = useState<ConversationMessageModel>();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [date, setDate] = useState<Date>(new Date());
    const [open, setOpen] = useState<boolean>(false);
    const userAuthenticated = useSelector(UserAuthenticated);
    const handleOpen = (handleMessage?: ConversationMessageModel | null) => {
        if (handleMessage) setConversationMessage(handleMessage);
        setOpen(true);
    }
    const handleClose = (): void => {
        setConversationMessage(null);
        setOpen(false);
    }

    useEffect(() => {
        const fetchConversationAndMessages = async () => {
            try {
                setLoading(true);
                const {dataConversation, errorConversation} = await getConversationOfMission(mission.id);
                if (errorConversation) {
                    setErrorMessage('Loading conversation of mission has failed !');
                    toast.error('Loading conversation of mission has failed !')
                } else {
                    if (dataConversation && dataConversation.length === 1) {
                        setConversation(dataConversation[0]);
                        const {
                            messagesOfConversation,
                            errorMessagesOfConversation
                        } = await getMessagesOfConversation(dataConversation[0].id);
                        if (errorMessagesOfConversation) {
                            setErrorMessage('Loading messages of mission has failed !');
                            toast.error('Loading messages of mission has failed !')
                        } else {
                            setConversationMessages(messagesOfConversation);
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchConversationAndMessages();
    }, [date])

    useEffect(() => {
        const fetchConversationMessages = async () => {
            try {
                if (conversation) {
                    setLoading(true);
                    const {
                        messagesOfConversation,
                        errorMessagesOfConversation
                    } = await getMessagesOfConversation(conversation.id);
                    if (errorMessagesOfConversation) {
                        setErrorMessage('Loading messages of conversation has failed !');
                        toast.error('Loading messages of conversation has failed !')
                    } else {
                        setConversationMessages(messagesOfConversation);
                    }
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchConversationMessages();
    }, [date])

    useEffect(() => {
        const subscribeConversationMessages = async () => {
            try {
                supabase
                    .from('conversation_messages')
                    .on('*', () => {
                        setDate(new Date());
                    })
                    .subscribe()
            } catch (error) {
                console.log(error);
            }
        }
        subscribeConversationMessages();
    }, [])

    const deleteMessage = async (messageId: string): Promise<void> => {
        try {
            const {error} = await updateConversationMessage({deleted: 1}, messageId);
            if (error) {
                toast.error(`Remove of the message has failed !`);
            } else {
                toast.success('Message has been removed !');
                setDate(new Date());
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {conversation
                ? <HeadSection title={`Conversation messages for the mission : ${mission.code}`}
                               textButton={'Add Message'}
                               handleOpen={handleOpen}/>
                : <HeadSection title={`Conversation messages for the mission : ${mission.code}`}/>
            }
            <Paper>
                {conversationMessages && conversationMessages.length !== 0 ? (
                        conversationMessages.map((message: ConversationMessageModel) =>
                            <Box
                                className={userAuthenticated.id === message.user.id ? 'box-authenticated' : 'box-not-authenticated'}>
                                <div className="box-header">
                                    <span>
                                        {userAuthenticated.id === message.user.id && <b>Vous</b>}
                                        {userAuthenticated.id !== message.user.id &&
                                        <><b>{message.user.username}</b> ({message.user.role})</>
                                        }
                                    </span>
                                    <Button
                                        onClick={() => {
                                            handleOpen(message)
                                        }}
                                        sx={{margin: '0 0.5rem'}}
                                        variant="contained"
                                        startIcon={<CreateIcon/>}
                                    >
                                        Modify
                                    </Button>
                                    <Button
                                        onClick={async () => await deleteMessage(message.id)}
                                        sx={{margin: '0 0.5rem'}}
                                        color="secondary"
                                        variant="contained"
                                        startIcon={<DeleteIcon/>}
                                    >
                                        Delete
                                    </Button>
                                </div>
                                <div className={userAuthenticated.id === message.user.id ? 'box-content-authenticated' : 'box-content-not-authenticated'}>
                                    <p>{message.content}</p>
                                    <span className="box-created">{getDayMonthAndHour(message.created_at)}</span>
                                </div>
                            </Box>
                        )
                    )
                    : loading ? (
                        <p>Loading</p>
                    ) : errorMessage ? (
                        <p>{errorMessage}</p>
                    ) : (
                        <p>No messages available</p>
                    )}
            </Paper>
            <MyModal
                open={open}
                handleClose={handleClose}>
                <FormConversationMessage
                    conversation={conversation}
                    message={conversationMessage}
                    setDate={() => setDate(new Date())}
                    handleClose={handleClose}
                />
            </MyModal>
        </>
    )
}

export default TabConversation;
