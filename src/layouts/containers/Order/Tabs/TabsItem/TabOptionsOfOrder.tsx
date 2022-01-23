import React, {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import HeadSection from '../../../../components/HeadSection/HeadSection';
import {Paper, TableContainer} from '@mui/material';
import Table from '@mui/material/Table';
import {OptionModel} from '../../../../../core/models/option/option.model';
import {getOptionsWithoutPagination} from '../../../../../core/service/option/option.service';
import THeadOption from '../../../Option/Tables/TableOption/THeadOption';
import TBodyOption from '../../../Option/Tables/TableOption/TBodyOption';
import {OrderModel} from '../../../../../core/models/order/order.model';
import FormAddOptionOfOrder from '../../Forms/FormAddOptionOfOrder';
import {getOptionsOfOrder} from '../../../../../core/service/option_order/optionOrder.service';

interface IPropsTabOptions {
    order: OrderModel;
}

const TabOptionsOfOrder: React.FC<IPropsTabOptions> = ({order}) => {
    const [options, setOptions] = useState<OptionModel[]>([]);
    const [optionsOfOrder, setOptionsOfOrder] = useState<OptionModel[]>();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [date, setDate] = useState<Date>(new Date());

    useEffect(() => {
        const fetchOptionsOfOrder = async () => {
            try {
                setLoading(true);
                const {data, error} = await getOptionsOfOrder(order.id);
                if (error) {
                    setErrorMessage('Loading options of order has failed !');
                    toast.error('Loading options of order has failed !')
                } else {
                    setOptionsOfOrder(data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchOptionsOfOrder();
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
            <HeadSection title={`Attribute options to the order : ${order.code}`}/>
            {options && options.length !== 0 && <FormAddOptionOfOrder options={options} order={order} setDate={() => setDate(new Date())}/>}
            {optionsOfOrder && optionsOfOrder.length !== 0 ? (
                    <>
                        <Paper>
                            <TableContainer>
                                <Table>
                                    <THeadOption/>
                                    <TBodyOption
                                        order={order}
                                        options={optionsOfOrder}
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

export default TabOptionsOfOrder;
