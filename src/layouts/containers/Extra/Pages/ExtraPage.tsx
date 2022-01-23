import React, {useCallback, useEffect, useState} from 'react';
import {debounce} from 'lodash';
import {Paper, TableContainer} from '@mui/material';
import Table from '@mui/material/Table';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import {ExtraFilterModel, ExtraModel} from '../../../../core/models/extra/extra.model';
import {handleFiltersChange} from '../../../../core/helpers/filters/filter-enabled.helper';
import MyModal from '../../../components/Modal/MyModal';
import SearchInput from '../../../components/SearchInput/SearchInput';
import {TranslationSelected} from '../../../../core/store/translation/translation.selector';
import HeadSection from '../../../components/HeadSection/HeadSection';
import {FilterEnabledModel} from '../../../../core/models/utils/filters/filterEnabled.model';
import {getCountExtras, getExtras, getFiltersExtra} from '../../../../core/service/extra/extra.service';
import FiltersExtra from '../FilterExtra/FiltersExtra';
import TBodyExtra from '../TableExtra/TBodyExtra';
import THeadExtra from '../TableExtra/THeadExtra';
import Pagination from '../../../components/Pagination/pagination';
import FormExtra from '../Forms/FormExtra';
import {ProductModel} from "../../../../core/models/product/product.model";
import {handleCloseHelper, handleOpenHelper} from "../../../../core/helpers/modal/modal.helper";

const ExtraPage: React.FC = () => {
    const [extras, setExtras] = useState<ExtraModel[]>();
    const [extra, setExtra] = useState<ExtraModel>();
    const [countExtras, setCountExtras] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [search, setSearch] = useState<string>();
    const [filters, setFilters] = useState<ExtraFilterModel>();
    const [filtersEnabled, setFiltersEnabled] = useState<FilterEnabledModel[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [date, setDate] = useState<Date>(new Date());
    const [open, setOpen] = useState<boolean>(false);
    const translationSelected = useSelector(TranslationSelected);
    const handleOpen = (extra: ExtraModel): void => handleOpenHelper(setExtra, setOpen, extra);
    const handleClose = (updated?: boolean): void => handleCloseHelper(setDate, setExtra, setOpen, updated);

    const debounceQuery = useCallback(() => {
            const fetchExtras = debounce(async () => {
                try {
                    setLoading(true);
                    const {data, error} = await getExtras(filtersEnabled, currentPage, search);
                    if (error) {
                        setErrorMessage('Loading extras has failed !');
                        toast.error('Loading extras has failed !')
                    } else {
                        setExtras(data);
                    }
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            }, 500)
            fetchExtras();
        }, [currentPage, search, filtersEnabled, translationSelected, date]
    );

    useEffect(() => {
        debounceQuery();
    }, [debounceQuery, date]);

    // Get the list of the filters for the Extra page
    useEffect(() => {
        const fetchFilters = async () => {
            try {
                setLoading(true);
                const {listValues, error} = await getFiltersExtra();
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

    // Recall in the array only when add/delete data
    useEffect(() => {
        const fetchCount = async () => {
            try {
                setLoading(true);
                const {count, error} = await getCountExtras(filtersEnabled, search);
                if (error) {
                    setErrorMessage('An error has appeared on the loading of the count of extras !');
                    toast.error('An error has appeared on the loading of the count of extras !')
                } else {
                    setCountExtras(count);
                }
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }
        fetchCount();
    }, [search, filtersEnabled]);

    return (
        <>
            <HeadSection title={"List of the extras"} textButton={"Add Extra"} handleOpen={() => handleOpen(extra)}/>
            <SearchInput
                onSearch={(value: string) => {
                    setCurrentPage(1);
                    setSearch(value);
                }}
            />
            {<FiltersExtra
                filters={filters}
                filtersEnabled={filtersEnabled}
                setFiltersEnabled={(filters) => handleFiltersChange(filters, setFiltersEnabled, setCurrentPage)}
            />}
            {extras && extras.length !== 0 ? (
                    <>
                        <Paper>
                            <TableContainer>
                                <Table>
                                    <THeadExtra/>
                                    <TBodyExtra
                                        extras={extras}
                                        handleOpen={handleOpen}
                                        setDate={() => setDate(new Date())}
                                    />
                                </Table>
                            </TableContainer>
                            {<Pagination
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                totalItems={countExtras}
                            />}
                        </Paper>
                    </>
                )
                : loading ? (
                    <p>Loading</p>
                ) : errorMessage ? (
                    <p>{errorMessage}</p>
                ) : (
                    <p>No extras available</p>
                )}
            <MyModal
                open={open}
                handleClose={handleClose}>
                <FormExtra
                    extra={extra}
                    handleClose={handleClose}
                />
            </MyModal>
        </>
    )
}

export default ExtraPage;
