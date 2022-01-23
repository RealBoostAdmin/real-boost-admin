import {FormControl} from '@mui/material';
import React, {useState} from 'react';
import {makeStyles} from '@mui/styles';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import {useForm} from 'react-hook-form';
import HeaderFormModal from '../../../components/Forms/HeaderFormModal/HeaderFormModal';
import {toast} from 'react-toastify';
import ErrorInputForm from '../../../components/Errors/ErrorInputForm/ErrorInputForm';
import {OrderModel} from '../../../../core/models/order/order.model';
import {createOrder, updateOrder} from '../../../../core/service/order/order.service';
import {orderCodeGenerateHelper} from '../../../../core/helpers/code-generate/code-generate.helper';
import FormLabel from '@mui/material/FormLabel';
import DraftEditor from '../../../components/DraftEditor/DraftEditor';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {ProductModel} from '../../../../core/models/product/product.model';
import {getUserByUsername} from '../../../../core/service/user/user.service';
import {Role} from '../../../../core/models/user/user.model';
import {DiscountModel} from '../../../../core/models/discount/discount.model';

interface IAddDiscountOfOrderProps {
    order?: OrderModel | null;
    discounts: DiscountModel[];
    setDate: (date: Date) => void;
}

const useStyles = makeStyles(() => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '5rem',
        width: '30%'
    },
}))

const FormDiscountOfOrder: React.FC<IAddDiscountOfOrderProps> = ({
                                                                     order,
                                                                     discounts,
                                                                     setDate
                                                                 }) => {
    const classes = useStyles();
    const [discountSelected, setDiscountSelected] = useState<DiscountModel>(order?.discount ? order.discount : null);
    const {formState, handleSubmit} = useForm({mode: 'onChange'})
    const {isSubmitting, isValid} = formState;

    const editDiscountOfOrder = async (): Promise<void> => {
        try {
            const {data, error} = await updateOrder({discount_id: discountSelected.id}, order.id);
            if (error) {
                toast.error('Edit order has failed !');
            } else {
                toast.success(`The order ${data.name} has been edited !`);
                setDate(new Date());
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(editDiscountOfOrder)}
                  className={classes.form}>
                <FormControl fullWidth>
                    <InputLabel id="select-discount">Choose a discount</InputLabel>
                    <Select
                        labelId="select-discount"
                        id="select-discount"
                        label="Discount"
                        name="discount"
                        defaultValue={discountSelected ? discountSelected.code : null}
                    >
                        {!!discounts && discounts.length !== 0 && discounts.map((discount: DiscountModel) =>
                            <MenuItem
                                key={discount.code}
                                value={discount.code}
                                onClick={() => setDiscountSelected(discount)}
                            >
                                {discount.code}
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>
                <Button
                    sx={{marginTop: '1rem'}}
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting || !isValid}
                >
                    Attribute
                </Button>
            </form>
        </>
    )
}

export default FormDiscountOfOrder;
