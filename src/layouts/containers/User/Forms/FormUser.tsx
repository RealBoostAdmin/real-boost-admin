import {FormControl} from '@mui/material';
import React, {useState} from 'react';
import {makeStyles} from '@mui/styles';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import {useForm} from 'react-hook-form';
import HeaderFormModal from '../../../components/Forms/HeaderFormModal/HeaderFormModal';
import {toast} from 'react-toastify';
import ErrorInputForm from '../../../components/Errors/ErrorInputForm/ErrorInputForm';
import {Role, roles, UserModel} from "../../../../core/models/user/user.model";
import {updateUser} from "../../../../core/service/user/user.service";
import {TranslationModel} from "../../../../core/models/translation/translation.model";
import {useSelector} from "react-redux";
import {Translations} from "../../../../core/store/translation/translation.selector";
import ImageUpload from "../../../components/Forms/FileUpload/ImageUpload";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {deleteFiles} from '../../../../core/helpers/storage/storage.helper';

type UserFormType = {
    username?: string;
    role?: string;
}

interface IAddUserProps {
    user?: UserModel | null;
    handleClose: (updated?: boolean) => void;
}

const useStyles = makeStyles(() => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}))

const FormUser: React.FC<IAddUserProps> = ({
                                               user,
                                               handleClose
                                           }) => {
    const classes = useStyles();
    const {register, formState, handleSubmit} = useForm<UserFormType>({mode: 'onChange'})
    const {isSubmitting, errors, isValid} = formState;
    const translations = useSelector(Translations);
    const [translationSelected, setTranslationSelected] = useState<TranslationModel>(
        user?.translation ? user?.translation : translations[0]
    );
    const [avatar, setAvatar] = useState(null);
    const [oldFiles, setOldFiles] = useState<string[]>([]);

    const editUser = async (patchData: UserFormType): Promise<void> => {
        try {
            const {data, error} = avatar ? await updateUser({
                ...patchData,
                avatar_url: avatar,
                translation_id: translationSelected.id
            }, user.id) : await updateUser({...patchData, translation_id: translationSelected.id}, user.id)
            if (error) {
                toast.error('Edit user has failed !');
            } else {
                if (oldFiles) {
                    const {errorFile} = await deleteFiles('avatars', oldFiles);
                    if (errorFile) {
                        console.log(errorFile);
                        toast.error('Error on delete previous avatars');
                    }
                }
                toast.success(`The user with email ${data.email} has been edited !`);
                handleClose(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <HeaderFormModal
                title={user ? 'Edit a user' : 'Add a user'}
                handleClose={handleClose}
            />
            <form onSubmit={handleSubmit(editUser)} className={classes.form}>
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input
                        type="text"
                        className="input-group"
                        name="username"
                        defaultValue={user ? user?.username : null}
                        placeholder={'Username'}
                        id="username"
                        {...register('username')}
                        error={!!errors.username}
                    />
                    {errors.username && <ErrorInputForm errorMessage={errors.username.message}/>}
                </FormControl>
                <FormControl sx={{my: 2}}>
                    <ImageUpload
                        url={avatar ? avatar : user?.avatar_url}
                        size={150}
                        onUpload={(url) => setAvatar(url)}
                        storageName={'avatars'}
                        oldFiles={oldFiles}
                        setOldFiles={setOldFiles}
                    />
                </FormControl>
                <FormControl sx={{width: '200px'}}>
                    <InputLabel id="role">Role</InputLabel>
                    <Select
                        label="Role"
                        defaultValue={roles[0]}
                        name="role"
                        {...register('role')}
                    >
                        {roles.length !== 0 && roles.map((role: Role) =>
                            <MenuItem
                                key={role}
                                value={role}
                            >
                                {role}
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>
                <FormControl sx={{width: '200px'}}>
                    <InputLabel id="role">Translation</InputLabel>
                    <Select
                        label="Translation"
                        defaultValue={user?.translation.code}
                    >
                        {translations.length !== 0 && translations.map((translation: TranslationModel) =>
                            <MenuItem
                                key={translation.code}
                                value={translation.code}
                                onClick={() => setTranslationSelected(translation)}
                            >
                                {translation.code}
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>
                <Button
                    sx={{marginTop: '1rem'}}
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting || !isValid}
                >
                    {user ? 'Edit' : 'Create'}
                </Button>
            </form>
        </>
    )
}

export default FormUser;
