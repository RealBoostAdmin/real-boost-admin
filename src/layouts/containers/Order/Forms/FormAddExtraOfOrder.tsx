import React, {useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {toast} from 'react-toastify';
import {useForm} from 'react-hook-form';
import Button from '@mui/material/Button';
import {FormControl} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {OptionModel} from '../../../../core/models/option/option.model';
import {OrderModel} from '../../../../core/models/order/order.model';
import {createOptionOrder, getOptionOrder} from '../../../../core/service/option_order/optionOrder.service';
import {ExtraModel} from "../../../../core/models/extra/extra.model";
import {createExtraOrder, getExtraOrder} from "../../../../core/service/extra_order/extraOrder.service";

interface IPropsFormAddExtraOfOrder {
    extras: ExtraModel[];
    order: OrderModel
    setDate: () => void;
}

const useStyles = makeStyles(() => ({
    form: {
        display: 'start',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    }
}))

const FormAddExtraOfOrder: React.FC<IPropsFormAddExtraOfOrder> = ({extras, order, setDate}) => {
    const [extra, setExtra] = useState<ExtraModel>(extras[0]);
    const {formState, handleSubmit} = useForm({mode: 'onChange'})
    const {isSubmitting, isValid} = formState;
    const classes = useStyles();

    const addExtraOfOrder = async () => {
        try {
            const {data} = await getExtraOrder(extra.id, order.id);
            if (data && data.length === 0 ) {
                const {errorExtraOrder} = await createExtraOrder({extra_id: extra.id, order_id: order.id});
                if (errorExtraOrder) {
                    toast.error(`Create extra of order ${order.code} has failed !`)
                } else {
                    toast.success(`Create of the extra ${data.name} of order ${order.code} has failed`)
                    setDate();
                }
            } else {
                toast.error(`Extra ${extra.name} is already associated to the order ${order.code}`);
            }
        } catch (error) {
            console.log(error);
            toast.error(`Create extra of order ${order.code} has failed !`)
        }
    }

    return (
        extras && extras.length !== 0 && (
            <form onSubmit={handleSubmit(addExtraOfOrder)} className={classes.form}>
                <FormControl>
                    <InputLabel id="select-label-name">Add extra to the order</InputLabel>
                    <Select
                        labelId="select-label-name"
                        id="select-name"
                        label="Extra name"
                        defaultValue={extras[0].name}
                    >
                        {extras.length !== 0 && extras.map((extra: ExtraModel) =>
                            <MenuItem
                                key={extra.name}
                                value={extra.name}
                                onClick={() => setExtra(extra)}
                            >
                                {extra.name}
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
                    {'Save'}
                </Button>
            </form>
        )
    )
}

export default FormAddExtraOfOrder;
