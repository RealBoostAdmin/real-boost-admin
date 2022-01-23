import React, {useCallback, useEffect, useState} from 'react';
import {debounce} from 'lodash';
import {Paper, TableContainer} from '@mui/material';
import Table from '@mui/material/Table';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import MyModal from '../../../components/Modal/MyModal';
import SearchInput from '../../../components/SearchInput/SearchInput';
import {TranslationSelected} from '../../../../core/store/translation/translation.selector';
import HeadSection from '../../../components/HeadSection/HeadSection';
import Pagination from '../../../components/Pagination/pagination';
import {handleCloseHelper, handleOpenHelper} from "../../../../core/helpers/modal/modal.helper";
import {DiscountModel} from '../../../../core/models/discount/discount.model';
import {getCountDiscounts, getDiscounts} from '../../../../core/service/discount/discount.service';
import THeadDiscount from '../Table/THeadDiscount';
import TBodyDiscount from '../Table/TBodyDiscount';
import FormDiscount from '../Form/FormDiscount';

const DiscountPage: React.FC = () => {
    const [discounts, setDiscounts] = useState<DiscountModel[]>();
    const [discount, setDiscount] = useState<DiscountModel>();
    const [countDiscounts, setCountDiscounts] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [search, setSearch] = useState<string>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [date, setDate] = useState<Date>(new Date());
    const [open, setOpen] = useState<boolean>(false);
    const translationSelected = useSelector(TranslationSelected);
    const handleOpen = (discount: DiscountModel): void => handleOpenHelper(setDiscount, setOpen, discount);
    const handleClose = (updated?: boolean): void => handleCloseHelper(setDate, setDiscount, setOpen, updated);

    const debounceQuery = useCallback(() => {
            const fetchDiscounts = debounce(async () => {
                try {
                    setLoading(true);
                    const {data, error} = await getDiscounts(currentPage, search);
                    if (error) {
                        setErrorMessage('Loading discounts has failed !');
                        toast.error('Loading discounts has failed !')
                    } else {
                        setDiscounts(data);
                    }
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            }, 500)
            fetchDiscounts();
        }, [currentPage, search, translationSelected, date]
    );

    useEffect(() => {
        debounceQuery();
    }, [debounceQuery, date]);

    // Recall in the array only when add/delete data
    useEffect(() => {
        const fetchCount = async () => {
            try {
                setLoading(true);
                const {count, error} = await getCountDiscounts(search);
                if (error) {
                    setErrorMessage('An error has appeared on the loading of the count of discounts !');
                    toast.error('An error has appeared on the loading of the count of discounts !')
                } else {
                    setCountDiscounts(count);
                }
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }
        fetchCount();
    }, [search]);

    return (
        <>
            <HeadSection title={"List of the discounts"} textButton={"Add Discount"} handleOpen={() => handleOpen(discount)}/>
            <SearchInput
                onSearch={(value: string) => {
                    setCurrentPage(1);
                    setSearch(value);
                }}
            />
            {discounts && discounts.length !== 0 ? (
                    <>
                        <Paper>
                            <TableContainer>
                                <Table>
                                    <THeadDiscount/>
                                    <TBodyDiscount
                                        discounts={discounts}
                                        handleOpen={handleOpen}
                                        setDate={() => setDate(new Date())}
                                    />
                                </Table>
                            </TableContainer>
                            {<Pagination
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                totalItems={countDiscounts}
                            />}
                        </Paper>
                    </>
                )
                : loading ? (
                    <p>Loading</p>
                ) : errorMessage ? (
                    <p>{errorMessage}</p>
                ) : (
                    <p>No discounts available</p>
                )}
            <MyModal
                open={open}
                handleClose={handleClose}>
                <FormDiscount
                    discount={discount}
                    handleClose={handleClose}
                />
            </MyModal>
        </>
    )
}

export default DiscountPage;
