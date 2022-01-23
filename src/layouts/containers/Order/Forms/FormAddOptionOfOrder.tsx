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

interface IPropsFormAddOptionOfOrder {
    options: OptionModel[];
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

const FormAddOptionOfOrder: React.FC<IPropsFormAddOptionOfOrder> = ({options, order, setDate}) => {
    const [option, setOption] = useState<OptionModel>(options[0]);
    const {formState, handleSubmit} = useForm({mode: 'onChange'})
    const {isSubmitting, isValid} = formState;
    const classes = useStyles();

    const addOptionOfOrder = async () => {
        try {
            const {data} = await getOptionOrder(option.id, order.id);
            if (data && data.length === 0 ) {
                const {errorOptionOrder} = await createOptionOrder({option_id: option.id, order_id: order.id});
                if (errorOptionOrder) {
                    toast.error(`Create option of order ${order.code} has failed !`)
                } else {
                    toast.success(`Create of the option ${data.name} of order ${order.code} has failed`)
                    setDate();
                }
            } else {
                toast.error(`Option ${option.name} is already associated to the order ${order.code}`);
            }
        } catch (error) {
            console.log(error);
            toast.error(`Create option of order ${order.code} has failed !`)
        }
    }

    return (
        options && options.length !== 0 && (
            <form onSubmit={handleSubmit(addOptionOfOrder)} className={classes.form}>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Add option to the order</InputLabel>
                    <Select
                        labelId="select-label-name"
                        id="select-name"
                        label="Option name"
                        defaultValue={options[0].name}
                    >
                        {options.length !== 0 && options.map((option: OptionModel) =>
                            <MenuItem
                                key={option.name}
                                value={option.name}
                                onClick={() => setOption(option)}
                            >
                                {option.name}
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

export default FormAddOptionOfOrder;
