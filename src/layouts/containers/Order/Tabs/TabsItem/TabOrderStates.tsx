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
import {OrderStateModel} from "../../../../../core/models/order_state/order_state.model";
import {QuestionModel} from "../../../../../core/models/question/question.model";
import {handleCloseHelper, handleOpenHelper} from "../../../../../core/helpers/modal/modal.helper";
import MyModal from "../../../../components/Modal/MyModal";
import FormQuestion from "../../../Question/Forms/FormQuestion";
import THeadOrderState from "../../Tables/TableOrderState/THeadOrderState";
import TBodyOrderState from "../../Tables/TableOrderState/TBodyOrderState";
import FormOrderState from "../../Forms/FormOrderState";
import {getOrderStates} from "../../../../../core/service/order_state/order_state.service";

interface IPropsTabOrderStates {
    order: OrderModel;
}

const TabOrderStates: React.FC<IPropsTabOrderStates> = ({order}) => {
    const [orderState, setOrderState] = useState<OrderStateModel>(null);
    const [orderStates, setOrderStates] = useState<OrderStateModel[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [date, setDate] = useState<Date>(new Date());
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = (orderState: OrderStateModel): void => handleOpenHelper(setOrderState, setOpen, orderState);
    const handleClose = (updated?: boolean): void => handleCloseHelper(setDate, setOrderState, setOpen, updated);

    useEffect(() => {
        const fetchOrderStatesOfOrder = async () => {
            try {
                setLoading(true);
                const {data, error} = await getOrderStates(order.id);
                if (error) {
                    setErrorMessage('Loading order states has failed !');
                    toast.error('Loading order states has failed !')
                } else {
                    setOrderStates(data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchOrderStatesOfOrder();
    }, [date])

    return (
        <>
            <HeadSection
                title={`Order states of the order ${order.code}`}
                textButton={"Add order state"}
                handleOpen={handleOpen}
            />
            {orderStates && orderStates.length !== 0 ? (
                    <>
                        <Paper>
                            <TableContainer>
                                <Table>
                                    <THeadOrderState/>
                                    <TBodyOrderState
                                        orderStates={orderStates}
                                        handleOpen={handleOpen}
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
                    <p>No order states available</p>
                )}
            <MyModal
                open={open}
                handleClose={handleClose}>
                <FormOrderState
                    order={order}
                    orderState={orderState}
                    handleClose={handleClose}
                />
            </MyModal>
        </>
    )
}

export default TabOrderStates;
