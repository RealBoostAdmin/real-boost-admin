import React, {useEffect, useState} from 'react';
import {FilterEnabledModel} from '../../../core/models/utils/filters/filterEnabled.model';
import Pagination from '../../components/Pagination/pagination';
import {handleFiltersChange} from '../../../core/helpers/filters/filter-enabled.helper';
import {Paper, TableContainer} from '@mui/material';
import {LanguageFilterModel, LanguageModel} from '../../../core/models/language/language.model';
import FiltersLanguage from './FiltersLanguage';
import THeadLanguage from './TableLanguage/THeadLanguage';
import TBodyLanguage from './TableLanguage/TBodyLanguage';
import Table from '@mui/material/Table';
import {getCountLanguages, getFiltersLanguage, getLanguages} from '../../../core/service/language/language.service';
import MyModal from '../../components/Modal/MyModal';
import FormLanguage from './Forms/FormLanguage';
import SearchInput from '../../components/SearchInput/SearchInput';
import {toast} from 'react-toastify';
import HeadSection from "../../components/HeadSection/HeadSection";
import {handleCloseHelper, handleOpenHelper} from "../../../core/helpers/modal/modal.helper";
import {useDebouncedFunction} from "../../../core/helpers/debounce/debounce.helper";

const LanguagePage = () => {
    const [languages, setLanguages] = useState<LanguageModel[]>();
    const [language, setLanguage] = useState<LanguageModel>();
    const [countTranslations, setCountTranslations] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [search, setSearch] = useState<string>();
    const [filters, setFilters] = useState<LanguageFilterModel>();
    const [filtersEnabled, setFiltersEnabled] = useState<FilterEnabledModel[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [date, setDate] = useState<Date>(new Date());
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = (language: LanguageModel): void => handleOpenHelper(setLanguage, setOpen, language);
    const handleClose = (updated?: boolean): void => handleCloseHelper(setDate, setLanguage, setOpen, updated);

    const fetchLanguagesAndCount = async () => {
        try {
            setLoading(true);
            const {data, error} = await getLanguages(filtersEnabled, currentPage, search);
            if (error) {
                setErrorMessage('Loading languages has failed !');
                toast.error('Loading languages has failed !')
            } else {
                setLanguages(data);
            }
            const query = await getCountLanguages(filtersEnabled, search);
            if (query.error) {
                setErrorMessage('An error has appeared on the loading of the count of languages !');
                toast.error('An error has appeared on the loading of the count of languages !')
            } else {
                setCountTranslations(query.count);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    useDebouncedFunction(fetchLanguagesAndCount, [search, filtersEnabled, currentPage, date], 500);

    // Get the list of the filters for the Translation page
    useEffect(() => {
        const fetchFilters = async () => {
            setLoading(true);
            try {
                setLoading(true);
                const {listValues, error} = await getFiltersLanguage();
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
                title={"List of languages"}
                textButton={"Add Language"}
                handleOpen={() => handleOpen(language)}
            />
            <SearchInput
                onSearch={(value: string) => {
                    setCurrentPage(1);
                    setSearch(value);
                }}
            />
            {<FiltersLanguage
                filters={filters}
                filtersEnabled={filtersEnabled}
                setFiltersEnabled={(filters) => handleFiltersChange(filters, setFiltersEnabled, setCurrentPage)}
            />}
            {languages && languages.length !== 0 ? (
                    <>
                        <Paper>
                            <TableContainer>
                                <Table>
                                    <THeadLanguage/>
                                    <TBodyLanguage
                                        languages={languages}
                                        handleOpen={handleOpen}
                                        setDate={() => setDate(new Date())}
                                    />
                                </Table>
                            </TableContainer>
                            {<Pagination
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                totalItems={countTranslations}
                            />}
                        </Paper>
                    </>
                )
                : loading ? (
                    <p>Loading</p>
                ) : errorMessage ? (
                    <p>{errorMessage}</p>
                ) : (
                    <p>No languages available</p>
                )}
            <MyModal
                open={open}
                handleClose={handleClose}>
                <FormLanguage
                    language={language}
                    handleClose={handleClose}
                />
            </MyModal>
        </>
    )
}

export default LanguagePage;
