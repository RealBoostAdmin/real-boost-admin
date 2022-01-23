import React, {useEffect, useState} from 'react';
import {ProductModel} from '../../../../../core/models/product/product.model';
import {toast} from 'react-toastify';
import HeadSection from '../../../../components/HeadSection/HeadSection';
import {Paper, TableContainer} from '@mui/material';
import Table from '@mui/material/Table';
import {OptionModel} from '../../../../../core/models/option/option.model';
import {getOptionsOfProduct} from '../../../../../core/service/option_product/optionProduct.service';
import {getOptionsWithoutPagination} from '../../../../../core/service/option/option.service';
import THeadOption from '../../../Option/Tables/TableOption/THeadOption';
import TBodyOption from '../../../Option/Tables/TableOption/TBodyOption';
import FormAddOptionOfProduct from '../../Forms/FormAddOptionOfProduct';

interface IPropsTabOptions {
    product: ProductModel;
}

const TabOptionsOfProduct: React.FC<IPropsTabOptions> = ({product}) => {
    const [options, setOptions] = useState<OptionModel[]>([]);
    const [optionsOfProduct, setOptionsOfProduct] = useState<OptionModel[]>();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [date, setDate] = useState<Date>(new Date());

    useEffect(() => {
        const fetchOptionsOfProduct = async () => {
            try {
                setLoading(true);
                const {data, error} = await getOptionsOfProduct(product.id);
                if (error) {
                    setErrorMessage('Loading options of product has failed !');
                    toast.error('Loading options of product has failed !')
                } else {
                    setOptionsOfProduct(data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchOptionsOfProduct();
    }, [date])

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const {data, error} = await getOptionsWithoutPagination();
                error ? toast.error('Loading options has failed !') : setOptions(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchOptions();
    }, [])

    return (
        <>
            <HeadSection title={`Attribute options to the product : ${product.name}`}/>
            {options && options.length !== 0 && <FormAddOptionOfProduct options={options} product={product} setDate={() => setDate(new Date())}/>}
            {optionsOfProduct && optionsOfProduct.length !== 0 ? (
                    <>
                        <Paper>
                            <TableContainer>
                                <Table>
                                    <THeadOption/>
                                    <TBodyOption
                                        product={product}
                                        options={optionsOfProduct}
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
                ) : errorMessage ? (
                    <p>{errorMessage}</p>
                ) : (
                    <p>No options available</p>
                )}
        </>
    )
}

export default TabOptionsOfProduct;
