import React, {useEffect, useState} from 'react';
import {FilterEnabledModel} from '../../../../core/models/utils/filters/filterEnabled.model';
import Pagination from '../../../components/Pagination/pagination';
import {handleFiltersChange} from '../../../../core/helpers/filters/filter-enabled.helper';
import {Paper, TableContainer} from '@mui/material';
import Table from '@mui/material/Table';
import MyModal from '../../../components/Modal/MyModal';
import SearchInput from '../../../components/SearchInput/SearchInput';
import {toast} from 'react-toastify';
import HeadSection from "../../../components/HeadSection/HeadSection";
import {MissionFilterModel, MissionModel} from '../../../../core/models/mission/mission.model';
import {getCountMissions, getFiltersMission, getMissions} from '../../../../core/service/mission/mission.service';
import FiltersMission from '../FilterMission/FiltersMission';
import THeadMission from '../Tables/TableMission/THeadMission';
import TBodyMission from '../Tables/TableMission/TBodyMission';
import FormMission from '../Forms/FormMission';
import {handleCloseHelper, handleOpenHelper} from "../../../../core/helpers/modal/modal.helper";
import {useDebouncedFunction} from "../../../../core/helpers/debounce/debounce.helper";

const MissionPage: React.FC = () => {
    const [missions, setMissions] = useState<MissionModel[]>();
    const [mission, setMission] = useState<MissionModel>();
    const [countMissions, setCountMissions] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [search, setSearch] = useState<string>();
    const [filters, setFilters] = useState<MissionFilterModel>();
    const [filtersEnabled, setFiltersEnabled] = useState<FilterEnabledModel[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [date, setDate] = useState<Date>(new Date());
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = (mission: MissionModel): void => handleOpenHelper(setMission, setOpen, mission);
    const handleClose = (updated?: boolean): void => handleCloseHelper(setDate, setMission, setOpen, updated);

    const fetchMissionsAndCount = async () => {
        try {
            setLoading(true);
            const {data, error} = await getMissions(filtersEnabled, currentPage, search);
            if (error) {
                setErrorMessage('Loading missions has failed !');
                toast.error('Loading missions has failed !')
            } else {
                setMissions(data);
            }
            const query = await getCountMissions(filtersEnabled, search);
            if (query.error) {
                setErrorMessage('An error has appeared on the loading of the count of missions !');
                toast.error('An error has appeared on the loading of the count of missions !')
            } else {
                setCountMissions(query.count);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    useDebouncedFunction(fetchMissionsAndCount, [search, filtersEnabled, currentPage, date], 500);

    // Get the list of the filters for the Mission page
    useEffect(() => {
        const fetchFilters = async () => {
            try {
                setLoading(true);
                const {listValues, error} = await getFiltersMission();
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
    }, [setFilters])

    return (
        <>
            <HeadSection title={"List of the missions"}/>
            <SearchInput
                onSearch={(value: string) => {
                    setCurrentPage(1);
                    setSearch(value);
                }}
            />
            {<FiltersMission
                filters={filters}
                filtersEnabled={filtersEnabled}
                setFiltersEnabled={(filters) => handleFiltersChange(filters, setFiltersEnabled, setCurrentPage)}
            />}
            {missions && missions.length !== 0 ? (
                    <>
                        <Paper>
                            <TableContainer>
                                <Table>
                                    <THeadMission/>
                                    <TBodyMission
                                        missions={missions}
                                        handleOpen={handleOpen}
                                        setDate={() => setDate(new Date())}
                                    />
                                </Table>
                            </TableContainer>
                            {<Pagination
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                totalItems={countMissions}
                            />}
                        </Paper>
                    </>
                )
                : loading ? (
                    <p>Loading</p>
                ) : errorMessage ? (
                    <p>{errorMessage}</p>
                ) : (
                    <p>No missions available</p>
                )}
            <MyModal
                open={open}
                handleClose={handleClose}>
                <FormMission
                    mission={mission}
                    handleClose={handleClose}
                />
            </MyModal>
        </>
    )
}

export default MissionPage;
