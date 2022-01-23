import React, {useEffect, useState} from 'react';
import {FilterEnabledModel} from '../../../../core/models/utils/filters/filterEnabled.model';
import Pagination from '../../../components/Pagination/pagination';
import {handleFiltersChange} from '../../../../core/helpers/filters/filter-enabled.helper';
import {Paper, TableContainer} from '@mui/material';
import Table from '@mui/material/Table';
import MyModal from '../../../components/Modal/MyModal';
import SearchInput from '../../../components/SearchInput/SearchInput';
import {toast} from 'react-toastify';
import {GameFilterModel, GameModel} from '../../../../core/models/game/game.model';
import {getCountGames, getFiltersGame, getGamesFiltered} from '../../../../core/service/game/game.service';
import FiltersGame from '../FilterGame/FiltersGame';
import THeadGame from '../TableGame/THeadGame';
import TBodyGame from '../TableGame/TBodyGame';
import FormGame from '../Forms/FormGame';
import HeadSection from '../../../components/HeadSection/HeadSection';
import {useDebouncedFunction} from '../../../../core/helpers/debounce/debounce.helper';
import {handleCloseHelper, handleOpenHelper} from '../../../../core/helpers/modal/modal.helper';

const GamePage: React.FC = () => {
    const [games, setGames] = useState<GameModel[]>();
    const [game, setGame] = useState<GameModel>();
    const [countGames, setCountGames] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [search, setSearch] = useState<string>();
    const [filters, setFilters] = useState<GameFilterModel>();
    const [filtersEnabled, setFiltersEnabled] = useState<FilterEnabledModel[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [date, setDate] = useState<Date>(new Date());
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = (game?: GameModel): void => handleOpenHelper(setGame, setOpen, game);
    const handleClose = (updated?: boolean): void => handleCloseHelper(setDate, setGame, setOpen, updated);

    const fetchGamesAndCount = async () => {
        try {
            setLoading(true);
            const {data, error} = await getGamesFiltered(filtersEnabled, currentPage, search);
            if (error) {
                setErrorMessage('Loading games has failed !');
                toast.error('Loading games has failed !')
            } else {
                setGames(data);
            }
            const query = await getCountGames(filtersEnabled, search);
            if (query.error) {
                setErrorMessage('An error has appeared on the loading of the count of games !');
                toast.error('An error has appeared on the loading of the count of games !')
            } else {
                setCountGames(query.count);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    useDebouncedFunction(fetchGamesAndCount, [search, filtersEnabled, currentPage, date], 500);

    // Get the list of the filters for the Game page
    useEffect(() => {
        const fetchFilters = async () => {
            try {
                setLoading(true);
                const {listValues, error} = await getFiltersGame();
                if (error) {
                    setErrorMessage('An error has appeared on the loading of the filters !');
                    toast.error('An error has appeared on the loading of the filters !')
                } else {
                    setFilters(listValues);
                }
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }
        fetchFilters();
    }, [date])

    return (
        <>
            <HeadSection title={'List of the games'} textButton={'Add Game'} handleOpen={handleOpen}/>
            <SearchInput
                onSearch={(value: string) => {
                    setCurrentPage(1);
                    setSearch(value);
                }}
            />
            {<FiltersGame
                filters={filters}
                filtersEnabled={filtersEnabled}
                setFiltersEnabled={(filters) => handleFiltersChange(filters, setFiltersEnabled, setCurrentPage)}
            />}
            {games && games.length !== 0 ? (
                    <>
                        <Paper>
                            <TableContainer>
                                <Table>
                                    <THeadGame/>
                                    <TBodyGame
                                        games={games}
                                        handleOpen={handleOpen}
                                        setDate={() => setDate(new Date())}
                                        editable={true}
                                    />
                                </Table>
                            </TableContainer>
                            {<Pagination
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                totalItems={countGames}
                                itemsPerPage={10}
                            />}
                        </Paper>
                    </>
                )
                : loading ? (
                    <p>Loading</p>
                ) : errorMessage ? (
                    <p>{errorMessage}</p>
                ) : (
                    <p>No games available</p>
                )}
            <MyModal
                open={open}
                handleClose={handleClose}>
                <FormGame
                    game={game}
                    handleClose={handleClose}
                />
            </MyModal>
        </>
    )
}

export default GamePage;
