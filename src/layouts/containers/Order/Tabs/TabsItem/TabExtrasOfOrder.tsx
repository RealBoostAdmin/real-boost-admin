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
import {ExtraModel} from "../../../../../core/models/extra/extra.model";
import {getExtrasOfOrder} from "../../../../../core/service/extra_order/extraOrder.service";
import {getExtrasWithoutPagination} from "../../../../../core/service/extra/extra.service";
import THeadExtra from "../../../Extra/TableExtra/THeadExtra";
import TBodyExtra from "../../../Extra/TableExtra/TBodyExtra";
import FormAddExtraOfOrder from "../../Forms/FormAddExtraOfOrder";

interface IPropsTabExtras {
    order: OrderModel;
}

const TabExtrasOfOrder: React.FC<IPropsTabExtras> = ({order}) => {
    const [extras, setExtras] = useState<ExtraModel[]>([]);
    const [extrasOfOrder, setExtrasOfOrder] = useState<ExtraModel[]>();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [date, setDate] = useState<Date>(new Date());

    useEffect(() => {
        const fetchExtrasOfOrder = async () => {
            try {
                setLoading(true);
                const {data, error} = await getExtrasOfOrder(order.id);
                if (error) {
                    setErrorMessage('Loading extras of order has failed !');
                    toast.error('Loading extras of order has failed !')
                } else {
                    setExtrasOfOrder(data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchExtrasOfOrder();
    }, [date])

    useEffect(() => {
        const fetchExtras = async () => {
            try {
                const {data, error} = await getExtrasWithoutPagination();
                error ? toast.error('Loading extras has failed !') : setExtras(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchExtras();
    }, [])

    return (
        <>
            <HeadSection title={`Attribute extras to the order : ${order.code}`}/>
            {extras && extras.length !== 0 && <FormAddExtraOfOrder extras={extras} order={order} setDate={() => setDate(new Date())}/>}
            {extrasOfOrder && extrasOfOrder.length !== 0 ? (
                    <>
                        <Paper>
                            <TableContainer>
                                <Table>
                                    <THeadExtra/>
                                    <TBodyExtra
                                        order={order}
                                        extras={extrasOfOrder}
                                        setDate={() => setDate(new Date())}
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
                    <p>No extras available</p>
                )}
        </>
    )
}

export default TabExtrasOfOrder;
