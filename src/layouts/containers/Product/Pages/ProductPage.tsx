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
import {ProductFilterModel, ProductModel} from '../../../../core/models/product/product.model';
import {getCountProducts, getFiltersProduct, getProducts} from '../../../../core/service/product/product.service';
import FiltersProduct from '../FilterProduct/FiltersProduct';
import THeadProduct from '../Tables/TableProduct/THeadProduct';
import TBodyProduct from '../Tables/TableProduct/TBodyProduct';
import FormProduct from '../Forms/FormProduct';
import {getGames} from '../../../../core/service/game/game.service';
import {GameModel} from '../../../../core/models/game/game.model';
import {useDebouncedFunction} from '../../../../core/helpers/debounce/debounce.helper';
import {handleCloseHelper, handleOpenHelper} from '../../../../core/helpers/modal/modal.helper';

const ProductPage: React.FC = () => {
    const [products, setProducts] = useState<ProductModel[]>();
    const [product, setProduct] = useState<ProductModel>();
    const [countProducts, setCountProducts] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [search, setSearch] = useState<string>();
    const [filters, setFilters] = useState<ProductFilterModel>();
    const [filtersEnabled, setFiltersEnabled] = useState<FilterEnabledModel[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [date, setDate] = useState<Date>(new Date());
    const [open, setOpen] = useState<boolean>(false);
    const [games, setGames] = useState<GameModel[]>([]);
    const handleOpen = (product: ProductModel): void => handleOpenHelper(setProduct, setOpen, product);
    const handleClose = (updated?: boolean): void => handleCloseHelper(setDate, setProduct, setOpen, updated);

    const fetchProductsAndCount = async () => {
        try {
            setLoading(true);
            const {data, error} = await getProducts(filtersEnabled, currentPage, search);
            if (error) {
                setErrorMessage('Loading products has failed !');
                toast.error('Loading products has failed !')
            } else {
                setProducts(data);
            }
            const query = await getCountProducts(filtersEnabled, search);
            if (query.error) {
                setErrorMessage('An error has appeared on the loading of the count of products !');
                toast.error('An error has appeared on the loading of the count of products !')
            } else {
                setCountProducts(query.count);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    useDebouncedFunction(fetchProductsAndCount, [search, filtersEnabled, currentPage, date], 500);

    // Get the list of the filters for the Question page
    useEffect(() => {
        const fetchFilters = async () => {
            try {
                setLoading(true);
                const {listValues, error} = await getFiltersProduct();
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

    useEffect(() => {
        const fetchGames = async () => {
            try {
                setLoading(true);
                const {data, error} = await getGames();
                error ? toast.error('Loading games has failed !') : setGames(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchGames();
    }, [setGames])

    return (
        <>
            <HeadSection title={"List of the products"} textButton={"Add Product"} handleOpen={() => handleOpen(product)}/>
            <SearchInput
                onSearch={(value: string) => {
                    setCurrentPage(1);
                    setSearch(value);
                }}
            />
            {<FiltersProduct
                filters={filters}
                filtersEnabled={filtersEnabled}
                setFiltersEnabled={(filters) => handleFiltersChange(filters, setFiltersEnabled, setCurrentPage)}
            />}
            {products && products.length !== 0 ? (
                    <>
                        <Paper>
                            <TableContainer>
                                <Table>
                                    <THeadProduct/>
                                    <TBodyProduct
                                        products={products}
                                        handleOpen={handleOpen}
                                        setDate={() => setDate(new Date())}
                                    />
                                </Table>
                            </TableContainer>
                            {<Pagination
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                totalItems={countProducts}
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
                    <p>No products available</p>
                )}
            <MyModal
                open={open}
                handleClose={handleClose}>
                <FormProduct
                    product={product}
                    handleClose={handleClose}
                    games={games}
                />
            </MyModal>
        </>
    )
}

export default ProductPage;
