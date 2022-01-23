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
import {MissionModel, MissionState, missionStates} from '../../../../core/models/mission/mission.model';
import {createMission, updateMission} from '../../../../core/service/mission/mission.service';
import {useSelector} from 'react-redux';
import {UserAuthenticated} from '../../../../core/store/auth/auth.selector';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {getProfilesOfMission} from '../../../../core/service/profile_mission/profileMission.service';
import {ProfileModel} from '../../../../core/models/profile/profile.model';
import {createBill} from '../../../../core/service/bill/bill.service';
import {getRandomNumber} from '../../../../core/helpers/math/math.helper';
import {supabase} from '../../../../core/supabase/client';
import {jsPDF} from 'jspdf';
import {UserModel} from '../../../../core/models/user/user.model';
import {ConversationState} from '../../../../core/models/conversation/conversation.model';
import {
    createConversation,
    updateConversationOfMission
} from '../../../../core/service/conversation/conversation.service';
import {createDispute} from '../../../../core/service/dispute/dispute.service';
import {DisputeState} from '../../../../core/models/dispute/dispute.model';
import {
    billCodeGenerateHelper,
    missionCodeGenerateHelper
} from '../../../../core/helpers/code-generate/code-generate.helper';
import {OrderModel} from '../../../../core/models/order/order.model';

type MissionFormType = {
    currency?: string;

    total?: number;
    state: MissionState;
}

interface IAddMissionProps {
    order?: OrderModel | null;
    mission?: MissionModel | null;
    handleClose?: (updated?: boolean) => void;
    setDate?: (date: Date) => void;
}

const useStyles = makeStyles(() => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}))

const FormMission: React.FC<IAddMissionProps> = ({
                                                     order,
                                                     mission,
                                                     handleClose,
                                                     setDate
                                                 }) => {
    const classes = useStyles();
    const {register, formState, handleSubmit} = useForm<MissionFormType>({mode: 'onChange'})
    const userAuthenticated: UserModel = useSelector(UserAuthenticated);
    const {isSubmitting, errors, isValid} = formState;

    const addMission = async (postData: MissionFormType): Promise<void> => {
        try {
            const {data, error} = await createMission({
                ...postData,
                state: MissionState.OPEN,
                code: await missionCodeGenerateHelper(),
                user_id: userAuthenticated.id,
                order_id: order.id
            });
            if (error) {
                toast.error('Add mission has failed !');
            } else {
                toast.success(`The mission ${data.name} has been added !`);
                //Create automatically a chat, dispute tchat will be created manually if we update the mission state to dispute
                const {errorConversation} = await createConversation({
                    state: ConversationState.OPEN,
                    mission_id: data.id,
                });
                if (errorConversation) toast.error('Error on creating Conversation for this mission')
                if (handleClose) handleClose(true);
                if (setDate) setDate(new Date());
            }
        } catch
            (error) {
            console.log(error);
        }
    }

    const editMission = async (patchData: MissionFormType): Promise<void> => {
        try {
            const {data, error} = await updateMission(patchData, mission.id);
            if (error) {
                toast.error('Edit mission has failed !');
            } else {
                toast.success(`The mission ${data.name} has been edited !`);
                if (patchData.state === MissionState.DISPUTED && !mission.dispute) {
                    const {errorDispute} = await createDispute({
                        state: DisputeState.OPEN,
                        mission_id: data.id,
                    });
                    if (errorDispute) toast.error('Error on creating Dispute for this mission')
                }
                if (patchData.state === MissionState.CLOSE) {
                    // Set state close of conversation
                    await updateConversationOfMission({state: ConversationState.CLOSE}, mission.id);
                    //Bills Create
                    const {profilesMissions, errorProfilesMissions} = await getProfilesOfMission(mission.id);
                    if (profilesMissions && profilesMissions.length !== 0 && !errorProfilesMissions) {
                        profilesMissions.map(async (profile: ProfileModel) => {
                            const doc = new jsPDF();
                            doc.text('Hello world!', 10, 10);
                            const docOutput = doc.output('blob');
                            const billCode = await billCodeGenerateHelper(mission.id);
                            // PDF CONTENT TO DO
                            const pdfFileName = `${await getRandomNumber(10000, 100000)}_${mission.code}_${billCode}.pdf`;
                            let {error: uploadError} = await supabase.storage
                                .from('bills')
                                .upload(pdfFileName, docOutput);
                            const {errorBill} = await createBill({
                                pdf_url: pdfFileName,
                                code: billCode,
                                user_id: profile.user.id,
                                mission_id: mission.id
                            });
                            if (errorBill) toast.error(`Error on creating Bill for each user of the missions ${mission.code} !`)
                        })
                    }
                }
                if (handleClose) handleClose(true);
                if (setDate) setDate(new Date());
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <HeaderFormModal
                title={mission ? 'Edit a mission' : 'Add a mission'}
                handleClose={handleClose}
            />
            <form onSubmit={handleSubmit(mission ? editMission : addMission)}
                  className={classes.form}>
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <InputLabel htmlFor="currency">Currency</InputLabel>
                    <Input
                        type="text"
                        className="input-group"
                        name="currency"
                        defaultValue={mission ? mission?.currency : null}
                        placeholder={'Currency of Mission'}
                        id="currency-input"
                        {...register('currency', {required: 'This field is required.'})}
                        error={!!errors.currency}
                    />
                    {errors.currency && <ErrorInputForm errorMessage={errors.currency.message}/>}
                </FormControl>
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <InputLabel htmlFor="total">Total</InputLabel>
                    <Input
                        type="text"
                        className="input-group"
                        name="total"
                        defaultValue={mission ? JSON.stringify(mission?.total) : null}
                        placeholder={'Total of Mission'}
                        id="total-input"
                        {...register('total')}
                        error={!!errors.total}
                    />
                    {errors.total && <ErrorInputForm errorMessage={errors.total.message}/>}
                </FormControl>
                {mission &&
                <FormControl sx={{width: '200px'}}>
                    <InputLabel id="state">State</InputLabel>
                    <Select
                        label="State"
                        defaultValue={mission ? mission.state : missionStates[0]}
                        name="state"
                        {...register('state')}
                    >
                        {missionStates.length !== 0 && missionStates.map((state: MissionState) =>
                            <MenuItem
                                key={state}
                                value={state}
                            >
                                {state}
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>
                }
                <Button
                    sx={{marginTop: '1rem'}}
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting || !isValid}
                >
                    {mission ? 'Edit' : 'Create'}
                </Button>
            </form>
        </>
    )
}

export default FormMission;
