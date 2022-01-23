import React from 'react';
import {TableBody, TableCell, TableRow} from '@mui/material';
import ActionButton from '../../../../components/Table/ActionButtons/ActionButtons';
import {toast} from 'react-toastify';
import {ProfileModel} from '../../../../../core/models/profile/profile.model';
import {MissionModel} from '../../../../../core/models/mission/mission.model';
import {
    deleteProfileMission,
    getProfileMission
} from '../../../../../core/service/profile_mission/profileMission.service';

interface ITypesTBodyProfile {
    mission?: MissionModel;
    handleOpen: (profile?: ProfileModel) => void;
    profiles: ProfileModel[];
    setDate: () => void;
}

const TBodyProfileOfMission = ({
                          mission,
                          handleOpen,
                          profiles,
                          setDate,
                      }: ITypesTBodyProfile) => {

    const removeRelation = async (id: string) => {
        if (mission) {
            try {
                const query = await getProfileMission(id, mission.id); // Check if data already exists
                if (query.data && query.data.length !== 0) {
                    const {error} = await deleteProfileMission(query.data[0].id);
                    if (error) {
                        toast.error(`Delete on Relation between the profile and the mission ${mission.code} has failed !`);
                    } else {
                        toast.success(`Relation between the profile and the mission ${mission.code} has been deleted !`);
                        setDate();
                    }
                }
            } catch (error) {
                toast.error(`Error on removing relation between profile and mission !`);
                console.log(error);
            }
        }
    }

    return (
        <TableBody>
            {(profiles && profiles.length !== 0) && (
                profiles.length !== 0 && profiles.map((profile: ProfileModel) => (
                    <TableRow key={profile.id} hover role="checkbox" tabIndex={-1}>
                        <TableCell
                            align={'center'}
                            sx={{cursor: 'pointer'}}
                        >
                            <b>{profile?.user?.username}</b>
                        </TableCell>
                        <TableCell
                            align={'center'}
                            sx={{cursor: 'pointer'}}
                        >
                            <b>{profile?.profile_mission?.part}</b>
                        </TableCell>
                        <TableCell
                            align={'center'}
                            sx={{cursor: 'pointer'}}
                        >
                            <b>{profile?.currency}</b>
                        </TableCell>
                        <ActionButton
                            model={profile}
                            handleOpen={handleOpen}
                            deleteItem={removeRelation}
                        />
                    </TableRow>
                ))
            )}
        </TableBody>
    )
}

export default TBodyProfileOfMission;
