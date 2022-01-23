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
import {createGame, updateGame} from '../../../../core/service/game/game.service';
import {GameModel} from '../../../../core/models/game/game.model';
import ImageUpload from '../../../components/Forms/FileUpload/ImageUpload';
import {deleteFiles} from '../../../../core/helpers/storage/storage.helper';

type GameFormType = {
    name: string;
}

interface IAddGameTranslationProps {
    game?: GameModel | null;
    handleClose: (updated?: boolean) => void;
}

const useStyles = makeStyles(() => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}))

const FormGame: React.FC<IAddGameTranslationProps> = ({
                                                          game,
                                                          handleClose
                                                      }) => {
    const classes = useStyles();
    const {register, formState, handleSubmit} = useForm<GameFormType>({mode: 'onChange'})
    const {isSubmitting, errors, isValid} = formState;
    const [gameImage, setGameImage] = useState(null);
    const [oldFiles, setOldFiles] = useState<string[]>([]);

    const addGame = async (postData: GameFormType): Promise<void> => {
        try {
            const postDataGame = {...postData, image_url: gameImage};
            const {data, error} = gameImage ? await createGame({...postDataGame}) : await createGame({...postData});
            if (error) {
                toast.error('Add game has failed !');
            } else {
                if (oldFiles) {
                    const {errorFile} = await deleteFiles('games', oldFiles);
                    if (errorFile) {
                        console.log(errorFile);
                        toast.error('Error on delete previous images');
                    }
                }
                toast.success(`The game ${data.name} has been added !`);
                handleClose(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const editGame = async (patchData: GameFormType): Promise<void> => {
        try {
            const patchDataGame = {...patchData, image_url: gameImage};
            const {data, error} = gameImage ? await updateGame(patchDataGame, game.id) : await updateGame(patchData, game.id);
            if (error) {
                toast.error('Edit game has failed !');
            } else {
                if (oldFiles) {
                    const {errorFile} = await deleteFiles('games', oldFiles);
                    if (errorFile) {
                        console.log(errorFile);
                        toast.error('Error on delete previous images');
                    }
                }
                toast.success(`The game ${data.name} has been edited !`);
                handleClose(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <HeaderFormModal
                title={game ? 'Edit a game and his translations' : 'Add a game'}
                handleClose={handleClose}
            />
            <form onSubmit={handleSubmit(game ? editGame : addGame)}
                  className={classes.form}>
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <InputLabel htmlFor="name">Name of the game</InputLabel>
                    <Input
                        type="text"
                        className="input-group"
                        name="name"
                        defaultValue={game ? game?.name : null}
                        placeholder={'Name of Game'}
                        id="name-input"
                        {...register('name', {required: 'This field is required.'})}
                        error={!!errors.name}
                    />
                    {errors.name && <ErrorInputForm errorMessage={errors.name.message}/>}
                </FormControl>
                <FormControl sx={{my: 2}}>
                    <ImageUpload
                        url={gameImage ? gameImage : game ? game?.image_url : null}
                        size={150}
                        onUpload={(url) => setGameImage(url)}
                        storageName={'games'}
                        oldFiles={oldFiles}
                        setOldFiles={setOldFiles}
                    />
                </FormControl>
                <Button
                    sx={{marginTop: '1rem'}}
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting || !isValid}
                >
                    {game ? 'Edit' : 'Create'}
                </Button>
            </form>
        </>
    )
}

export default FormGame;
