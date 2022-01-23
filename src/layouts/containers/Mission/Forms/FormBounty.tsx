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
import {createBounty, updateBounty} from '../../../../core/service/bounty/bounty.service';

type BountyFormType = {
    amount?: number;
    percent?: number;
}

interface IAddBountyProps {
    mission: MissionModel;
    setDate: (date: Date) => void;
}

const useStyles = makeStyles(() => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}))

const FormBounty: React.FC<IAddBountyProps> = ({
                                                     mission,
                                                     setDate
                                                 }) => {
    const classes = useStyles();
    const {register, formState, handleSubmit} = useForm<BountyFormType>({mode: 'onChange'})
    const {isSubmitting, errors, isValid} = formState;

    const addBounty = async (postData: BountyFormType): Promise<void> => {
        try {
            const {error} = await createBounty({...postData, mission_id: mission.id});
            if (error) {
                toast.error('Add bounty has failed !')
            } else {
                toast.success(`The bounty of mission ${mission.code} has been added !`);
                setDate(new Date());
            }
        } catch (error) {
            console.log(error);
        }
    }

    const editBounty = async (patchData: BountyFormType): Promise<void> => {
        try {
            const {error} = await updateBounty(patchData, mission.bounty.id);
            error
                ? toast.error('Edit bounty has failed !')
                : toast.success(`The bounty of mission ${mission.code} has been edited !`);
            if (error) {
                toast.error('Edit bounty has failed !');
            } else {
                toast.success(`The bounty of mission ${mission.code} has been edited !`);
                setDate(new Date());
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <HeaderFormModal
                title={mission.bounty ? 'Edit a bounty' : 'Add a bounty'}
            />
            <form onSubmit={handleSubmit(mission.bounty ? editBounty : addBounty)} className={classes.form}>
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <InputLabel htmlFor="amount">Amount</InputLabel>
                    <Input
                        type="number"
                        className="input-group"
                        name="amount"
                        defaultValue={mission.bounty ? mission.bounty?.amount : 0}
                        placeholder={'Amount'}
                        id="amount"
                        {...register('amount', {valueAsNumber: true})}
                        error={!!errors.amount}
                    />
                    {errors.amount && <ErrorInputForm errorMessage={errors.amount.message}/>}
                </FormControl>
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <InputLabel htmlFor="percent">Percent</InputLabel>
                    <Input
                        type="number"
                        className="input-group"
                        name="percent"
                        defaultValue={mission.bounty ? mission.bounty?.percent : 0}
                        placeholder={'Percent'}
                        id="percent"
                        {...register('percent', {min: 0, max: 100, valueAsNumber: true})}
                        error={!!errors.percent}
                    />
                    {errors.percent && <ErrorInputForm errorMessage={errors.percent.message}/>}
                </FormControl>
                <Button
                    sx={{marginTop: '1rem'}}
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting || !isValid}
                >
                    {mission.bounty ? 'Edit' : 'Create'}
                </Button>
            </form>
        </>
    )
}

export default FormBounty;
