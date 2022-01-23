import React, {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import HeadSection from '../../../../components/HeadSection/HeadSection';
import {MissionModel} from '../../../../../core/models/mission/mission.model';
import MyModal from '../../../../components/Modal/MyModal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import {UserAuthenticated} from '../../../../../core/store/auth/auth.selector';
import {useSelector} from 'react-redux';
import Paper from '@mui/material/Paper';
import {supabase} from '../../../../../core/supabase/client';
import {DisputeMessageModel} from '../../../../../core/models/dispute_message/dispute_message.model';
import {DisputeModel} from '../../../../../core/models/dispute/dispute.model';
import {
    getMessagesOfDispute,
    updateDisputeMessage
} from '../../../../../core/service/dispute_message/dispute_message.service';
import {getDisputeOfMission} from '../../../../../core/service/dispute/dispute.service';
import FormDisputeMessage from '../../Forms/FormDisputeMessage';

interface IPropsTabDispute {
    mission: MissionModel;
}

const TabDispute: React.FC<IPropsTabDispute> = ({mission}) => {
    const [dispute, setDispute] = useState<DisputeModel>()
    const [disputeMessages, setDisputeMessages] = useState<DisputeMessageModel[]>();
    const [disputeMessage, setDisputeMessage] = useState<DisputeMessageModel>();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [date, setDate] = useState<Date>(new Date());
    const [open, setOpen] = useState<boolean>(false);
    const userAuthenticated = useSelector(UserAuthenticated);
    const handleOpen = (handleMessage?: DisputeMessageModel | null) => {
        if (handleMessage) setDisputeMessage(handleMessage);
        setOpen(true);
    }
    const handleClose = (): void => {
        setDisputeMessage(null);
        setOpen(false);
    }

    useEffect(() => {
        const fetchDisputeOfMission = async () => {
            try {
                setLoading(true);
                const {dataDispute, errorDispute} = await getDisputeOfMission(mission.id);
                if (errorDispute) {
                    setErrorMessage('Loading dispute of mission has failed !');
                    toast.error('Loading dispute of mission has failed !')
                } else {
                    if (dataDispute && dataDispute.length === 1) {
                        setDispute(dataDispute[0]);
                        const {
                            messagesOfDispute,
                            errorMessagesOfDispute
                        } = await getMessagesOfDispute(dataDispute[0].id);
                        if (errorMessagesOfDispute) {
                            setErrorMessage('Loading messages of dispute has failed !');
                            toast.error('Loading messages of dispute has failed !')
                        } else {
                            setDisputeMessages(messagesOfDispute);
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchDisputeOfMission();
    }, [date])

    useEffect(() => {
        const fetchDisputeMessages = async () => {
            try {
                if (dispute) {
                    setLoading(true);
                    const {
                        messagesOfDispute,
                        errorMessagesOfDispute
                    } = await getMessagesOfDispute(dispute.id);
                    if (errorMessagesOfDispute) {
                        setErrorMessage('Loading messages of dispute has failed !');
                        toast.error('Loading messages of dispute has failed !')
                    } else {
                        setDisputeMessages(messagesOfDispute);
                    }
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchDisputeMessages();
    }, [date])

    useEffect(() => {
        const subscribeDisputeMessages = async () => {
            try {
                supabase
                    .from('dispute_messages')
                    .on('*', () => {
                        setDate(new Date());
                    })
                    .subscribe()
            } catch (error) {
                console.log(error);
            }
        }
        subscribeDisputeMessages();
    }, [])

    const deleteMessage = async (messageId: string): Promise<void> => {
        try {
            const {error} = await updateDisputeMessage({deleted: 1}, messageId);
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
            {dispute
                ? <HeadSection title={`Dispute messages for the mission : ${mission.code}`} textButton={'Add Message'}
                               handleOpen={handleOpen}/>
                : <HeadSection title={`Dispute messages for the mission : ${mission.code}`}/>
            }
            <Paper>
                {dispute && disputeMessages && disputeMessages.length !== 0 ? (
                        disputeMessages.map((message: DisputeMessageModel) =>
                            <Box sx={userAuthenticated.id === message.user.id ? {
                                float: 'left',
                                display: 'block',
                                width: '100%'
                            } : {float: 'right'}}>
                                <div style={{
                                    backgroundColor: '#fff',
                                    padding: '1em',
                                    border: '1px solid rgba(0, 0, 0, 0.12)',
                                    borderRadius: '5px',
                                    maxWidth: '50%',
                                    clear: 'both'
                                }}>
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
                                <p style={{
                                    backgroundColor: '#f9f9f9',
                                    border: '1px solid rgba(0, 0, 0, 0.12)',
                                    borderRadius: '5px',
                                    padding: '1rem',
                                    marginTop: '0',
                                    width: '50%'
                                }}>{message.content}</p>
                            </Box>
                        )
                    )
                    : loading ? (
                        <p>Loading</p>
                    ) : errorMessage ? (
                        <p>{errorMessage}</p>
                    ) : (
                        <p>No dispute or messages available</p>
                    )}
            </Paper>
            <MyModal
                open={open}
                handleClose={handleClose}>
                <FormDisputeMessage
                    dispute={dispute}
                    message={disputeMessage}
                    setDate={() => setDate(new Date())}
                    handleClose={handleClose}
                />
            </MyModal>
        </>
    )
}

export default TabDispute;
