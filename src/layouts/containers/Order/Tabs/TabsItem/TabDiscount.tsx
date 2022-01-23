import React, {useEffect, useState} from 'react';
import HeadSection from '../../../../components/HeadSection/HeadSection';
import {Paper, TableContainer} from '@mui/material';
import Table from '@mui/material/Table';
import THeadDiscount from '../../../Discount/Table/THeadDiscount';
import TBodyDiscount from '../../../Discount/Table/TBodyDiscount';
import {DiscountModel} from '../../../../../core/models/discount/discount.model';
import {useParams} from 'react-router';
import {toast} from 'react-toastify';
import {getDiscountsWithoutPagination} from '../../../../../core/service/discount/discount.service';
import FormDiscountOfOrder from '../../Forms/FormDiscountOfOrder';
import {OrderModel} from '../../../../../core/models/order/order.model';

interface IPropsTabDiscount {
    order?: OrderModel;
    setDate: (date: Date) => void;
}

const TabDiscount: React.FC<IPropsTabDiscount> = ({
                                                      order,
                                                      setDate
                                                  }) => {
    const [discounts, setDiscounts] = useState<DiscountModel[]>([]);
    const {code} = useParams();

    useEffect(() => {
        const fetchDiscounts = async () => {
            try {
                const {data, error} = await getDiscountsWithoutPagination();
                error && data.length !== 0 ? toast.error('Loading products has failed !') : setDiscounts(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchDiscounts();
    }, [setDiscounts])

    return (
        <>
            <HeadSection title={`Attribute discount to the order : ${code}`}/>
            <FormDiscountOfOrder setDate={setDate} order={order} discounts={discounts}/>
            {order.discount ? (
                    <>
                        <Paper>
                            <TableContainer>
                                <Table>
                                    <THeadDiscount/>
                                    <TBodyDiscount
                                        order={order}
                                        discounts={[order.discount]}
                                        setDate={() => setDate(new Date())}
                                    />
                                </Table>
                            </TableContainer>
                        </Paper>
                    </>
                )
                : (
                    <p>No discount</p>
                )}
        </>
    )
}

export default TabDiscount;
