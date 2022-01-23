import React from 'react';
import {TableBody, TableCell, TableRow} from '@mui/material';
import ActionButton from '../../../components/Table/ActionButtons/ActionButtons';
import {toast} from 'react-toastify';
import {deleteGame} from '../../../../core/service/game/game.service';
import {useNavigate} from 'react-router';
import {GameModel} from '../../../../core/models/game/game.model';
import ImageUpload from '../../../components/Forms/FileUpload/ImageUpload';
import {deleteFiles} from '../../../../core/helpers/storage/storage.helper';
import {ProfileModel} from "../../../../core/models/profile/profile.model";
import {deleteGameProfile, getGameProfile} from "../../../../core/service/game_profile/gameProfile.service";
import EditRelationButton from "../../../components/Table/EditRelationButton/EditRelationButton";

interface ITypesTBodyGame {
    profile?: ProfileModel;
    handleOpen?: (game?: GameModel) => void;
    games: GameModel[];
    setDate: () => void;
    editable?: boolean;
}

const TBodyGame = ({
                       profile,
                       handleOpen,
                       games,
                       setDate,
                       editable
                   }: ITypesTBodyGame) => {
    const navigate = useNavigate();

    const removeGame = async (game: GameModel): Promise<void> => {
        try {
            const {error} = await deleteGame(game.id);
            if (error) {
                toast.error('Delete game has failed !')
            } else {
                const {errorFile} = await deleteFiles('games', [game.image_url]);
                if (errorFile) {
                    toast.error('Error on delete previous files');
                } else {
                    toast.success('The game has been removed.')
                    setDate();
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const removeRelation = async (game: GameModel) => {
        if (game && profile) {
            try {
                const query = await getGameProfile(game.id, profile.id); // Check if data already exists
                if (query.data && query.data.length !== 0) {
                    const {error} = await deleteGameProfile(query.data[0].id);
                    if (error) {
                        toast.error(`Delete on Relation between the game ${game.name} and the profile has failed !`);
                    } else {
                        toast.success(`Relation between the game ${game.name} and the profile has been deleted !`);
                        setDate();
                    }
                }
            } catch (error) {
                toast.error(`Error on removing relation between game and profile !`);
                console.log(error);
            }
        }
    }

    return (
        <TableBody>
            {(games && games.length !== 0) && (
                games.length !== 0 && games.map((game: GameModel) => (
                    <TableRow key={game.id} hover role="checkbox" tabIndex={-1}>
                        <TableCell
                            key={game.name}
                            align={'center'}
                            sx={{cursor: 'pointer'}}
                            onClick={() => navigate(`../game/${game.name}`)}>
                            <b>{game.name}</b>
                        </TableCell>
                        <TableCell align={'center'}>
                            <ImageUpload
                                url={game?.image_url}
                                size={75}
                                storageName={'games'}
                            />
                        </TableCell>
                        {editable &&
                        <ActionButton
                            model={game}
                            handleOpen={handleOpen}
                            deleteItem={() => removeGame(game)}
                        />
                        }
                        {profile && <EditRelationButton model={game} editRelation={removeRelation}/>}
                    </TableRow>
                ))
            )}
        </TableBody>
    )
}

export default TBodyGame;
