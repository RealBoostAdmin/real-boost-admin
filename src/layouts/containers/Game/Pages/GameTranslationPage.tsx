import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {TranslationSelected} from '../../../../core/store/translation/translation.selector';
import {toast} from 'react-toastify';
import {GameTranslationModel} from '../../../../core/models/game/game-translation.model';
import {getGameTranslation,} from '../../../../core/service/game/gameTranslation.service';
import HeadSection from '../../../components/HeadSection/HeadSection';
import {useParams} from 'react-router';
import {GameModel} from '../../../../core/models/game/game.model';
import {getGame} from '../../../../core/service/game/game.service';
import Paper from '@mui/material/Paper';
import FormGameTranslation from '../Forms/FormGameTranslation';

const GameTranslationPage: React.FC = () => {
    const translationSelected = useSelector(TranslationSelected);
    const [gameTranslation, setGameTranslation] = useState<GameTranslationModel>();
    const [game, setGame] = useState<GameModel>();
    const {gameName} = useParams();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const {data, error} = await getGame(gameName);
                error
                    ? toast.error(`Loading of game failed !`)
                    : setGame(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchGame();
    }, [setGame])

    useEffect(() => {
        const fetchGameTranslation = async () => {
            try {
                setLoading(true);
                const {dataTranslation, errorTranslation} = await getGameTranslation(game.id, translationSelected.id);
                errorTranslation
                    ? toast.error(`Loading of game translation data in ${translationSelected.code} failed !`)
                    : setGameTranslation(dataTranslation[0]);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchGameTranslation();
    }, [game, setGameTranslation, translationSelected])

    return (
        <>
            {(!loading && !!game && !!translationSelected) &&
            <Paper sx={{paddingBottom: '2rem'}}>
                <HeadSection
                    title={gameTranslation ? `Edit ${game?.name} in ${translationSelected.code}` : `Add ${game?.name} in ${translationSelected.code}`}
                    back={true}
                />
                <FormGameTranslation
                    game={game}
                    gameTranslation={gameTranslation}
                    translationSelected={translationSelected}
                />
            </Paper>
            }
        </>
    )
}

export default GameTranslationPage;
