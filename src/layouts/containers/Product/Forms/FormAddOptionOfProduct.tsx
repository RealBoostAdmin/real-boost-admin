import React, {useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {ProductModel} from '../../../../core/models/product/product.model';
import {toast} from 'react-toastify';
import {useForm} from 'react-hook-form';
import Button from '@mui/material/Button';
import {FormControl} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {OptionModel} from '../../../../core/models/option/option.model';
import {createOptionProduct, getOptionProduct} from '../../../../core/service/option_product/optionProduct.service';

interface IPropsFormAddOptionOfProduct {
    options: OptionModel[];
    product: ProductModel
    setDate: () => void;
}

const useStyles = makeStyles(() => ({
    form: {
        display: 'start',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    }
}))

const FormAddOptionOfProduct: React.FC<IPropsFormAddOptionOfProduct> = ({options, product, setDate}) => {
    const [option, setOption] = useState<OptionModel>(options[0]);
    const {formState, handleSubmit} = useForm({mode: 'onChange'})
    const {isSubmitting, isValid} = formState;
    const classes = useStyles();

    const addOptionOfProduct = async () => {
        try {
            const {data} = await getOptionProduct(option.id, product.id);
            if (data && data.length === 0 ) {
                const {errorOptionProduct} = await createOptionProduct({option_id: option.id, product_id: product.id});
                if (errorOptionProduct) {
                    toast.error(`Create option of product ${product.name} has failed !`)
                } else {
                    toast.success(`Create of the option ${data.name} of product ${product.name} has failed`)
                    setDate();
                }
            } else {
                toast.error(`Option ${option.name} is already associated to the product ${product.name}`);
            }
        } catch (error) {
            console.log(error);
            toast.error(`Create option of product ${product.name} has failed !`)
        }
    }

    return (
        options && options.length !== 0 && (
            <form onSubmit={handleSubmit(addOptionOfProduct)} className={classes.form}>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Add option to the product</InputLabel>
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

export default FormAddOptionOfProduct;
