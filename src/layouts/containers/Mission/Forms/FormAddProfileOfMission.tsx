import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import {toast} from 'react-toastify';
import {useForm} from 'react-hook-form';
import Button from '@mui/material/Button';
import {FormControl} from '@mui/material';
import {makeStyles} from '@mui/styles';
import Input from '@mui/material/Input';
import ErrorInputForm from '../../../components/Errors/ErrorInputForm/ErrorInputForm';
import {
    createProfileMission,
    getProfileMission, updateProfileMission,
} from '../../../../core/service/profile_mission/profileMission.service';
import {getUserByUsername} from '../../../../core/service/user/user.service';
import {MissionModel} from '../../../../core/models/mission/mission.model';
import {ProfileModel} from '../../../../core/models/profile/profile.model';

type TPropsFormAddProfileOfMission = {
    username: string;
    part: number;
}

interface IPropsFormAddProfileOfMission {
    mission: MissionModel;
    profile?: ProfileModel | null;
    handleClose: (updated?: boolean) => void;
}

const useStyles = makeStyles(() => ({
    form: {
        display: 'start',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    }
}))

const FormAddProfileOfMission: React.FC<IPropsFormAddProfileOfMission> = ({
                                                                              mission,
                                                                              profile,
                                                                              handleClose
                                                                          }) => {
    const {register, formState, handleSubmit} = useForm<TPropsFormAddProfileOfMission>({mode: 'onChange'})
    const {isSubmitting, errors, isValid} = formState;
    const classes = useStyles();

    const addProfileOfMission = async (postData: TPropsFormAddProfileOfMission) => {
        try {
            const {user, errorUser} = await getUserByUsername(postData.username);
            if (errorUser || !user || user.length !== 1) {
                toast.error(`Cant find user with the username ${postData.username}`);
            } else {
                const {data} = await getProfileMission(user[0].profile.id, mission.id);
                if (data && data.length === 0) {
                    const {errorProfileMission} = await createProfileMission({
                        profile_id: user[0].profile.id,
                        mission_id: mission.id,
                        part: postData.part
                    });
                    if (errorProfileMission) {
                        toast.error(`Create profile of mission ${mission.code} has failed !`)
                    } else {
                        toast.success(`Create of the profile of mission ${mission.code} has failed`)
                        handleClose(true);
                    }
                } else {
                    toast.error(`This profile is already associated to the mission ${mission.code}`);
                }
            }
        } catch (error) {
            console.log(error);
            toast.error(`Create profile of mission ${mission.code} has failed !`)
        }
    }

    const editProfileOfMission = async (postData: TPropsFormAddProfileOfMission) => {
        try {
            const {user, errorUser} = await getUserByUsername(postData.username);
            if (errorUser || !user || user.length !== 1) {
                toast.error(`Cant find user with the username ${postData.username}`);
            } else {
                const {errorProfileMission} = await updateProfileMission({part: postData.part}, profile.profile_mission.id);
                if (errorProfileMission) {
                    toast.error(`update profile of mission ${mission.code} has failed !`)
                } else {
                    toast.success(`update of the profile of mission ${mission.code} has failed`)
                    handleClose(true);
                }
            }
        } catch (error) {
            console.log(error);
            toast.error(`update profile of mission ${mission.code} has failed !`)
        }
    }

    return (
        <form onSubmit={handleSubmit(profile ? editProfileOfMission : addProfileOfMission)} className={classes.form}>
            <FormControl>
                <InputLabel id="username">Add profile via his username</InputLabel>
                <Input
                    type="text"
                    className="input-group"
                    name="username"
                    placeholder={'Username'}
                    id="username-input"
                    defaultValue={profile ? profile.user.username : null}
                    {...register('username', {required: 'This field is required.'})}
                    error={!!errors.username}
                />
                {errors.username && <ErrorInputForm errorMessage={errors.username.message}/>}
            </FormControl>
            <FormControl>
                <InputLabel id="part">Part (%)</InputLabel>
                <Input
                    type="number"
                    className="input-group"
                    name="part"
                    placeholder={'Part'}
                    id="part-input"
                    defaultValue={profile ? profile.profile_mission.part : null}
                    {...register('part', {required: 'This field is required.'})}
                    error={!!errors.part}
                />
                {errors.part && <ErrorInputForm errorMessage={errors.part.message}/>}
            </FormControl>
            <Button
                sx={{marginTop: '1rem'}}
                variant="contained"
                color="primary"
                type="submit"
                disabled={isSubmitting || !isValid}
            >
                {'Save'}
            </Button>
        </form>
    )
}

export default FormAddProfileOfMission;
