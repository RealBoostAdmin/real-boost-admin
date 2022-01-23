import React, {useEffect, useState} from 'react';
import Pagination from '../../../components/Pagination/pagination';
import {Paper, TableContainer} from '@mui/material';
import Table from '@mui/material/Table';
import MyModal from '../../../components/Modal/MyModal';
import SearchInput from '../../../components/SearchInput/SearchInput';
import {toast} from 'react-toastify';
import HeadSection from "../../../components/HeadSection/HeadSection";
import {useDebouncedFunction} from '../../../../core/helpers/debounce/debounce.helper';
import {handleCloseHelper, handleOpenHelper} from '../../../../core/helpers/modal/modal.helper';
import THeadOrder from '../Tables/TableOrder/THeadOrder';
import TBodyOrder from '../Tables/TableOrder/TBodyOrder';
import {getCountOrders, getOrders} from '../../../../core/service/order/order.service';
import {OrderModel} from '../../../../core/models/order/order.model';
import FormOrder from '../Forms/FormOrder';
import {ProductModel} from '../../../../core/models/product/product.model';
import {getProducts} from '../../../../core/service/product/product.service';

const OrderPage: React.FC = () => {
    const [orders, setOrders] = useState<OrderModel[]>();
    const [order, setOrder] = useState<OrderModel>();
    const [countOrders, setCountOrders] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [search, setSearch] = useState<string>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [date, setDate] = useState<Date>(new Date());
    const [open, setOpen] = useState<boolean>(false);
    const [products, setProducts] = useState<ProductModel[]>([]);
    const handleOpen = (order: OrderModel): void => handleOpenHelper(setOrder, setOpen, order);
    const handleClose = (updated?: boolean): void => handleCloseHelper(setDate, setOrder, setOpen, updated);

    const fetchOrdersAndCount = async () => {
        try {
            setLoading(true);
            const {data, error} = await getOrders(currentPage, search);
            if (error) {
                setErrorMessage('Loading orders has failed !');
                toast.error('Loading orders has failed !')
            } else {
                setOrders(data);
            }
            const query = await getCountOrders(search);
            if (query.error) {
                setErrorMessage('An error has appeared on the loading of the count of orders !');
                toast.error('An error has appeared on the loading of the count of orders !')
            } else {
                setCountOrders(query.count);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    useDebouncedFunction(fetchOrdersAndCount, [search, currentPage, date], 500);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const {data, error} = await getProducts();
                error ? toast.error('Loading products has failed !') : setProducts(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, [setProducts])

    return (
        <>
            <HeadSection
                title={"List of the orders"}
                textButton={"Add Order"}
                handleOpen={() => handleOpen(order)}
            />
            <SearchInput
                onSearch={(value: string) => {
                    setCurrentPage(1);
                    setSearch(value);
                }}
            />
            {orders && orders.length !== 0 ? (
                    <>
                        <Paper>
                            <TableContainer>
                                <Table>
                                    <THeadOrder/>
                                    <TBodyOrder
                                        orders={orders}
                                        handleOpen={handleOpen}
                                        setDate={() => setDate(new Date())}
                                    />
                                </Table>
                            </TableContainer>
                            {<Pagination
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                totalItems={countOrders}
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
                    <p>No orders available</p>
                )}
            <MyModal
                open={open}
                handleClose={handleClose}>
                <FormOrder
                    order={order}
                    handleClose={handleClose}
                    products={products}
                />
            </MyModal>
        </>
    )
}

export default OrderPage;
