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
import FormOption from '../Forms/FormOption';
import {OptionFilterModel, OptionModel} from '../../../../core/models/option/option.model';
import {getCountOptions, getFiltersOption, getOptions} from '../../../../core/service/option/option.service';
import FiltersOption from '../FilterOption/FiltersOption';
import THeadOption from '../Tables/TableOption/THeadOption';
import TBodyOption from '../Tables/TableOption/TBodyOption';
import {handleCloseHelper, handleOpenHelper} from "../../../../core/helpers/modal/modal.helper";
import {useDebouncedFunction} from "../../../../core/helpers/debounce/debounce.helper";

const OptionPage: React.FC = () => {
    const [options, setOptions] = useState<OptionModel[]>();
    const [option, setOption] = useState<OptionModel>();
    const [countOptions, setCountOptions] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [search, setSearch] = useState<string>();
    const [filters, setFilters] = useState<OptionFilterModel>();
    const [filtersEnabled, setFiltersEnabled] = useState<FilterEnabledModel[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [date, setDate] = useState<Date>(new Date());
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = (option: OptionModel): void => handleOpenHelper(setOption, setOpen, option);
    const handleClose = (updated?: boolean): void => handleCloseHelper(setDate, setOption, setOpen, updated);

    const fetchOptionsAndCount = async () => {
        try {
            setLoading(true);
            const {data, error} = await getOptions(filtersEnabled, currentPage, search);
            if (error) {
                setErrorMessage('Loading options has failed !');
                toast.error('Loading options has failed !')
            } else {
                setOptions(data);
            }
            const query = await getCountOptions(filtersEnabled, search);
            if (query.error) {
                setErrorMessage('An error has appeared on the loading of the count of options !');
                toast.error('An error has appeared on the loading of the count of options !')
            } else {
                setCountOptions(query.count);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    useDebouncedFunction(fetchOptionsAndCount, [search, filtersEnabled, currentPage, date], 500);

    // Get the list of the filters for the Question page
    useEffect(() => {
        const fetchFilters = async () => {
            try {
                setLoading(true);
                const {listValues, error} = await getFiltersOption();
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
            <HeadSection
                title={"List of the options"}
                textButton={"Add Option"}
                handleOpen={() => handleOpen(option)}
            />
            <SearchInput
                onSearch={(value: string) => {
                    setCurrentPage(1);
                    setSearch(value);
                }}
            />
            {<FiltersOption
                filters={filters}
                filtersEnabled={filtersEnabled}
                setFiltersEnabled={(filters) => handleFiltersChange(filters, setFiltersEnabled, setCurrentPage)}
            />}
            {options && options.length !== 0 ? (
                    <>
                        <Paper>
                            <TableContainer>
                                <Table>
                                    <THeadOption/>
                                    <TBodyOption
                                        options={options}
                                        handleOpen={handleOpen}
                                        setDate={() => setDate(new Date())}
                                        editable={true}
                                    />
                                </Table>
                            </TableContainer>
                            {<Pagination
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                totalItems={countOptions}
                            />}
                        </Paper>
                    </>
                )
                : loading ? (
                    <p>Loading</p>
                ) : errorMessage ? (
                    <p>{errorMessage}</p>
                ) : (
                    <p>No options available</p>
                )}
            <MyModal
                open={open}
                handleClose={handleClose}>
                <FormOption
                    option={option}
                    handleClose={handleClose}
                />
            </MyModal>
        </>
    )
}

export default OptionPage;
