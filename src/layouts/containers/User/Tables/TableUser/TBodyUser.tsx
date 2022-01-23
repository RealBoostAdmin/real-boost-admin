import React from 'react';
import {TableBody, TableCell, TableRow} from '@mui/material';
import ActionButton from '../../../../components/Table/ActionButtons/ActionButtons';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router';
import {UserModel} from "../../../../../core/models/user/user.model";
import {deleteUser} from "../../../../../core/service/user/user.service";
import ImageUpload from "../../../../components/Forms/FileUpload/ImageUpload";
import {deleteFiles} from '../../../../../core/helpers/storage/storage.helper';

interface ITypesTBodyUser {
    handleOpen: (user?: UserModel) => void;
    users: UserModel[];
    setDate: () => void;
}

const TBodyUser = ({
                          handleOpen,
                          users,
                          setDate
                      }: ITypesTBodyUser) => {
    const navigate = useNavigate();

    const removeUser = async (user: UserModel): Promise<void> => {
        try {
            const {error} = await deleteUser(user.id);
            if (error) {
                toast.error('Delete user has failed !')
            } else {
                const {errorFile} = await deleteFiles('avatars', [user.avatar_url]);
                if (errorFile) {
                    console.log(errorFile);
                    toast.error('Error on delete previous files');
                }
                toast.success('The user has been removed.')
                setDate();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <TableBody>
            {(users && users.length !== 0) && (
                users.length !== 0 && users.map((user: UserModel) => (
                    <TableRow key={user.email} hover role="checkbox" tabIndex={-1}>
                        <TableCell
                            align={'center'}
                            sx={{cursor: 'pointer'}}
                            onClick={() => navigate(`../user/${user.id}`)}>
                            <b>{user.email}</b>
                        </TableCell>
                        <TableCell align={'center'}>
                            {user.username}
                        </TableCell>
                        <TableCell align={'center'}>
                            <ImageUpload
                                url={user?.avatar_url}
                                size={75}
                                storageName={'avatars'}
                            />
                        </TableCell>
                        <TableCell align={'center'}>
                            {user.role}
                        </TableCell>
                        <TableCell align={'center'}>
                            {user?.translation?.code ? user?.translation?.code : '-'}
                        </TableCell>
                        <ActionButton
                            model={user}
                            handleOpen={handleOpen}
                            deleteItem={() => removeUser(user)}
                        />
                    </TableRow>
                ))
            )}
        </TableBody>
    )
}

export default TBodyUser;
