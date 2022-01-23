import React, {useEffect, useState} from 'react';
import HeadSection from '../../../../components/HeadSection/HeadSection';
import {UserModel} from '../../../../../core/models/user/user.model';
import FormProfile from '../../Forms/FormProfile';
import {Paper, TableContainer} from "@mui/material";
import Table from "@mui/material/Table";
import FormAddGameOfProfile from "../../Forms/FormAddGameOfProfile";
import {toast} from "react-toastify";
import {GameModel} from "../../../../../core/models/game/game.model";
import {getGamesOfProfile} from "../../../../../core/service/game_profile/gameProfile.service";
import THeadGame from "../../../Game/TableGame/THeadGame";
import TBodyGame from "../../../Game/TableGame/TBodyGame";
import {getGames} from "../../../../../core/service/game/game.service";

interface IPropsTabProfile {
    user: UserModel
    date: Date;
    setDate: (date: Date) => void;
}

const TabProfile: React.FC<IPropsTabProfile> = ({user, date, setDate}) => {
    const [games, setGames] = useState<GameModel[]>([]);
    const [gamesOfProfile, setGamesOfProfile] = useState<GameModel[]>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchGamesOfProfile = async () => {
            try {
                setLoading(true);
                const {data, error} = await getGamesOfProfile(user.profile.id);
                if (error) {
                    toast.error('Loading games of profile has failed !')
                } else {
                    setGamesOfProfile(data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchGamesOfProfile();
    }, [date])

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const {data, error} = await getGames();
                error ? toast.error('Loading games has failed !') : setGames(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchGames();
    }, [])

    return (
        <>
            <HeadSection
                title={`Attribute profile to ${user.username}`}
                redirect={!!user?.profile ? `profile/${user.profile.id}` : null}
                redirectText={!!user?.profile ? 'Translations' : null}
            />
            {<FormProfile setDate={() => setDate(new Date())} user={user} edit={!!user.profile}/>}
            <HeadSection title={`Attribute games to the profile of ${user.username}`}/>
            {games && games.length !== 0 &&
            <FormAddGameOfProfile games={games} profile={user.profile} setDate={() => setDate(new Date())}/>}
            {gamesOfProfile && gamesOfProfile.length !== 0 ? (
                    <>
                        <Paper>
                            <TableContainer>
                                <Table>
                                    <THeadGame/>
                                    <TBodyGame
                                        profile={user.profile}
                                        games={gamesOfProfile}
                                        setDate={() => setDate(new Date())}
                                        editable={false}
                                    />
                                </Table>
                            </TableContainer>
                        </Paper>
                    </>
                )
                : loading ? (
                    <p>Loading</p>
                ) : (
                    <p>No games available</p>
                )}
        </>
    )
}

export default TabProfile;
