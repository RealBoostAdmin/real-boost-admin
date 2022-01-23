import React from 'react';
import {TableBody, TableCell, TableRow} from '@mui/material';
import ActionButton from '../../../../components/Table/ActionButtons/ActionButtons';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router';
import {MissionModel} from '../../../../../core/models/mission/mission.model';
import {deleteMission} from '../../../../../core/service/mission/mission.service';

interface IPropsTBodyMission {
    handleOpen: (mission?: MissionModel) => void;
    missions: MissionModel[];
    setDate: () => void;
}

const TBodyMission = ({
                          handleOpen,
                          missions,
                          setDate
                      }: IPropsTBodyMission) => {
    const navigate = useNavigate();

    const removeMission = async (id: string): Promise<void> => {
        try {
            const {error} = await deleteMission(id);
            if (error) {
                toast.error('Delete mission has failed !')
            } else {
                toast.success('The mission has been removed.')
                setDate();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <TableBody>
            {(missions && missions.length !== 0) && (
                missions.length !== 0 && missions.map((mission: MissionModel) => (
                    <TableRow key={mission.code} hover role="checkbox" tabIndex={-1}>
                        <TableCell
                            align={'center'}
                            sx={{cursor: 'pointer'}}
                            onClick={() => navigate(`../mission/${mission.code}`)}>
                            <b>{mission.code}</b>
                        </TableCell>
                        <TableCell align={'center'}>
                            {mission.state}
                        </TableCell>
                        <TableCell align={'center'}>
                            {mission.currency}
                        </TableCell>
                        <TableCell align={'center'}>
                            {mission.total}
                        </TableCell>
                        <TableCell align={'center'}>
                            {mission.user.username}
                        </TableCell>
                        <ActionButton
                            model={mission}
                            handleOpen={handleOpen}
                            deleteItem={removeMission}
                        />
                    </TableRow>
                ))
            )}
        </TableBody>
    )
}

export default TBodyMission;
