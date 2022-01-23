import React, {useState} from 'react';
import {Paper, TableContainer} from '@mui/material';
import Table from '@mui/material/Table';
import {toast} from 'react-toastify';
import {handleFiltersChange} from '../../../../core/helpers/filters/filter-enabled.helper';
import MyModal from '../../../components/Modal/MyModal';
import SearchInput from '../../../components/SearchInput/SearchInput';
import HeadSection from '../../../components/HeadSection/HeadSection';
import {FilterEnabledModel} from '../../../../core/models/utils/filters/filterEnabled.model';
import Pagination from '../../../components/Pagination/pagination';
import FiltersUser from '../FilterUser/FiltersUser';
import {UserModel} from '../../../../core/models/user/user.model';
import {getCountUsers, getUsers} from '../../../../core/service/user/user.service';
import THeadUser from '../Tables/TableUser/THeadUser';
import TBodyUser from '../Tables/TableUser/TBodyUser';
import FormUser from '../Forms/FormUser';
import {handleCloseHelper, handleOpenHelper} from "../../../../core/helpers/modal/modal.helper";
import {useDebouncedFunction} from "../../../../core/helpers/debounce/debounce.helper";

const UserPage: React.FC = () => {
    const [users, setUsers] = useState<UserModel[]>();
    const [user, setUser] = useState<UserModel>();
    const [countUsers, setCountUsers] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [search, setSearch] = useState<string>();
    const [filtersEnabled, setFiltersEnabled] = useState<FilterEnabledModel[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [date, setDate] = useState<Date>(new Date());
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = (user: UserModel): void => handleOpenHelper(setUser, setOpen, user);
    const handleClose = (updated?: boolean): void => handleCloseHelper(setDate, setUser, setOpen, updated);

    const fetchUsersAndCount = async () => {
        try {
            setLoading(true);
            const {data, error} = await getUsers(filtersEnabled, currentPage, search);
            if (error) {
                setErrorMessage('Loading users has failed !');
                toast.error('Loading users has failed !')
            } else {
                setUsers(data);
            }
            const query = await getCountUsers(filtersEnabled, search);
            if (query.error) {
                setErrorMessage('An error has appeared on the loading of the count of users !');
                toast.error('An error has appeared on the loading of the count of users !')
            } else {
                setCountUsers(query.count);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    useDebouncedFunction(fetchUsersAndCount, [search, filtersEnabled, currentPage, date], 500);

    return (
        <>
            <HeadSection title={"List of the users"}/>
            <SearchInput
                onSearch={(value: string) => {
                    setCurrentPage(1);
                    setSearch(value);
                }}
            />
            {<FiltersUser
                filtersEnabled={filtersEnabled}
                setFiltersEnabled={(filters) => handleFiltersChange(filters, setFiltersEnabled, setCurrentPage)}
            />}
            {users && users.length !== 0 ? (
                    <>
                        <Paper>
                            <TableContainer>
                                <Table>
                                    <THeadUser/>
                                    <TBodyUser
                                        users={users}
                                        handleOpen={handleOpen}
                                        setDate={() => setDate(new Date())}
                                    />
                                </Table>
                            </TableContainer>
                            {<Pagination
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                totalItems={countUsers}
                            />}
                        </Paper>
                    </>
                )
                : loading ? (
                    <p>Loading</p>
                ) : errorMessage ? (
                    <p>{errorMessage}</p>
                ) : (
                    <p>No users available</p>
                )}
            <MyModal
                open={open}
                handleClose={handleClose}>
                <FormUser
                    user={user}
                    handleClose={handleClose}
                />
            </MyModal>
        </>
    )
}

export default UserPage;
