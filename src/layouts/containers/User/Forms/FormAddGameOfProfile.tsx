import React, {useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {toast} from 'react-toastify';
import {useForm} from 'react-hook-form';
import Button from '@mui/material/Button';
import {FormControl} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {GameModel} from "../../../../core/models/game/game.model";
import {ProfileModel} from "../../../../core/models/profile/profile.model";
import {createGameProfile, getGameProfile} from "../../../../core/service/game_profile/gameProfile.service";

interface IPropsFormAddGameOfProfile {
    games: GameModel[];
    profile: ProfileModel
    setDate: () => void;
}

const useStyles = makeStyles(() => ({
    form: {
        display: 'start',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    }
}))

const FormAddGameOfProfile: React.FC<IPropsFormAddGameOfProfile> = ({games, profile, setDate}) => {
    const [game, setGame] = useState<GameModel>(games[0]);
    const {formState, handleSubmit} = useForm({mode: 'onChange'})
    const {isSubmitting, isValid} = formState;
    const classes = useStyles();

    const addGameOfProfile = async () => {
        try {
            const {data} = await getGameProfile(game.id, profile.id);
            if (data && data.length === 0) {
                const {errorGameProfile} = await createGameProfile({game_id: game.id, profile_id: profile.id});
                if (errorGameProfile) {
                    toast.error(`Create game of profile has failed !`)
                } else {
                    toast.success(`Create game ${data.name} of profile has failed`)
                    setDate();
                }
            } else {
                toast.error(`Game ${game.name} is already associated to this profile`);
            }
        } catch (error) {
            console.log(error);
            toast.error(`Create game of profile has failed !`)
        }
    }

    return (
        games && games.length !== 0 && (
            <form onSubmit={handleSubmit(addGameOfProfile)} className={classes.form}>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Add game to the profile</InputLabel>
                    <Select
                        labelId="select-label-name"
                        id="select-name"
                        label="Game name"
                        defaultValue={games[0].name}
                    >
                        {games.length !== 0 && games.map((game: GameModel) =>
                            <MenuItem
                                key={game.name}
                                value={game.name}
                                onClick={() => setGame(game)}
                            >
                                {game.name}
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
                    {'Save'}
                </Button>
            </form>
        )
    )
}

export default FormAddGameOfProfile;
