import React from 'react';
import {TableBody, TableCell, TableRow} from '@mui/material';
import ActionButton from '../../../../components/Table/ActionButtons/ActionButtons';
import {toast} from 'react-toastify';
import {ProfileModel} from "../../../../../core/models/profile/profile.model";
import {deleteProfile} from '../../../../../core/service/profile/profile.service';

interface ITypesTBodyProfile {
    handleOpen?: (profile?: ProfileModel) => void;
    profiles: ProfileModel[];
    setDate: () => void;
}

const TBodyProfile = ({
                          handleOpen,
                          profiles,
                          setDate,
                      }: ITypesTBodyProfile) => {

    const removeProfile = async (id: string): Promise<void> => {
        try {
            const {error} = await deleteProfile(id);
            if (error) {
                toast.error('Delete profile has failed !')
            } else {
                toast.success('The profile has been removed.')
                setDate();
            }
        } catch (error) {
            console.log(error);
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
                            <b>{profile.currency}</b>
                        </TableCell>
                        <ActionButton
                            model={profile}
                            handleOpen={handleOpen}
                            deleteItem={removeProfile}
                        />
                    </TableRow>
                ))
            )}
        </TableBody>
    )
}

export default TBodyProfile;
