import React, {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import HeadSection from '../../../../components/HeadSection/HeadSection';
import {Paper, TableContainer} from '@mui/material';
import Table from '@mui/material/Table';
import {MissionModel} from '../../../../../core/models/mission/mission.model';
import FormAddProfileOfMission from "../../Forms/FormAddProfileOfMission";
import {getProfilesOfMission} from "../../../../../core/service/profile_mission/profileMission.service";
import {ProfileModel} from "../../../../../core/models/profile/profile.model";
import MyModal from '../../../../components/Modal/MyModal';
import THeadProfileOfMission from '../../Tables/TableProfileOfMission/THeadProfileOfMission';
import TBodyProfileOfMission from '../../Tables/TableProfileOfMission/TBodyProfileOfMission';
import {handleCloseHelper, handleOpenHelper} from "../../../../../core/helpers/modal/modal.helper";

interface IPropsTabProfiles {
    mission: MissionModel;
}

const TabProfiles: React.FC<IPropsTabProfiles> = ({mission}) => {
    const [profilesOfMission, setProfilesOfMission] = useState<ProfileModel[]>();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [date, setDate] = useState<Date>(new Date());
    const [profileOfMission, setProfileOfMission] = useState<ProfileModel>();
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = (profileOfMission: ProfileModel): void => handleOpenHelper(setProfileOfMission, setOpen, profileOfMission);
    const handleClose = (updated?: boolean): void => handleCloseHelper(setDate, setProfileOfMission, setOpen, updated);

    useEffect(() => {
        const fetchProfilesOfMission = async () => {
            try {
                setLoading(true);
                const {profilesMissions, errorProfilesMissions} = await getProfilesOfMission(mission.id);
                if (errorProfilesMissions) {
                    setErrorMessage('Loading profiles of mission has failed !');
                    toast.error('Loading profiles of mission has failed !')
                } else {
                    setProfilesOfMission(profilesMissions);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchProfilesOfMission();
    }, [date])

    return (
        <>
            <HeadSection
                title={`Attribute profiles to the mission : ${mission.code}`}
                textButton={"Join Profile to the mission"}
                handleOpen={() => handleOpen(profileOfMission)}
            />
            {profilesOfMission && profilesOfMission.length !== 0 ? (
                    <>
                        <Paper>
                            <TableContainer>
                                <Table>
                                    <THeadProfileOfMission/>
                                    <TBodyProfileOfMission
                                        mission={mission}
                                        profiles={profilesOfMission}
                                        handleOpen={handleOpen}
                                        setDate={() => setDate(new Date())}
                                    />
                                </Table>
                            </TableContainer>
                        </Paper>
                    </>
                )
                : loading ? (
                    <p>Loading</p>
                ) : errorMessage ? (
                    <p>{errorMessage}</p>
                ) : (
                    <p>No profiles available</p>
                )}
            <MyModal
                open={open}
                handleClose={handleClose}>
                <FormAddProfileOfMission
                    mission={mission}
                    profile={profileOfMission}
                    handleClose={handleClose}
                />
            </MyModal>
        </>
    )
}

export default TabProfiles;
