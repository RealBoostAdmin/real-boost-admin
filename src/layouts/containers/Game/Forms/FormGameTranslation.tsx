import {FormControl} from '@mui/material';
import React from 'react';
import {makeStyles} from '@mui/styles';
import Button from '@mui/material/Button';
import {useForm} from 'react-hook-form';
import {toast} from 'react-toastify';
import {GameTranslationModel} from '../../../../core/models/game/game-translation.model';
import {
    createGameTranslation,
    updateGameTranslation
} from '../../../../core/service/game/gameTranslation.service';
import {GameModel} from '../../../../core/models/game/game.model';
import {TranslationModel} from '../../../../core/models/translation/translation.model';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import FormLabel from '@mui/material/FormLabel';
import DraftEditor from '../../../components/DraftEditor/DraftEditor';

type GameTranslationFormType = {
    description: string;
}

interface IFormGameTranslation {
    game: GameModel;
    gameTranslation?: GameTranslationModel;
    translationSelected: TranslationModel;
}

const useStyles = makeStyles(() => ({
    form: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: '2rem'
    },
    labelDescription: {
        fontWeight: '700 !important'
    }
}))

const FormGameTranslation: React.FC<IFormGameTranslation> = ({
                                                                 game,
                                                                 gameTranslation,
                                                                 translationSelected
                                                             }) => {
    const classes = useStyles();
    const {formState, handleSubmit, setValue} = useForm<GameTranslationFormType>({mode: 'onChange'})
    const {isSubmitting, isValid} = formState;

    const addGameTranslation = async (postData: GameTranslationFormType): Promise<void> => {
        try {
            const {error} = await createGameTranslation({...postData}, translationSelected.id, game.id);
            error
                ? toast.error('Add game translation has failed !')
                : toast.success(`The game ${game.name} has been translated in ${translationSelected.code} !`);
        } catch (error) {
            console.log(error);
        }
    };

    const editGameTranslation = async (patchData: GameTranslationFormType): Promise<void> => {
        try {
            const {error} = await updateGameTranslation({...patchData}, gameTranslation.id);
            error
                ? toast.error(`Edit the game ${game.name} in ${translationSelected.code} has failed !`)
                : toast.success(`The game ${game.name} has been edited in ${translationSelected.code} !`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(gameTranslation ? editGameTranslation : addGameTranslation)}
                  className={classes.form}>
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <FormLabel className={classes.labelDescription} htmlFor="description">Description</FormLabel>
                    <DraftEditor name={"description"} contentEditor={gameTranslation?.description} setValue={setValue}/>
                </FormControl>
                <Button
                    sx={{marginTop: '1rem'}}
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting || !isValid}
                >
                    {gameTranslation ? 'Edit' : 'Create'}
                </Button>
            </form>
        </>
    )
}

export default FormGameTranslation;
