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

type OrderFormType = {
    details: string;
    amount: number;
    vat: number;
    currency: string;
    comment: string;
    client: string;
}

interface IAddOrderProps {
    order?: OrderModel | null;
    handleClose: (updated?: boolean) => void;
    products?: ProductModel[];
}

const useStyles = makeStyles(() => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    labelDescription: {
        fontWeight: '700 !important'
    }
}))

const FormOrder: React.FC<IAddOrderProps> = ({
                                                 order,
                                                 handleClose,
                                                 products
                                             }) => {
    const classes = useStyles();
    const {register, formState, handleSubmit, setValue} = useForm<OrderFormType>({mode: 'onChange'})
    const {isSubmitting, errors, isValid} = formState;
    const [productSelected, setProductSelected] = useState<ProductModel>(order ? order.product : null);

    const addOrder = async (postData: OrderFormType): Promise<void> => {
        try {
            const {user, errorUser} = await getUserByUsername(postData.client);
            delete postData.client;
            if (!errorUser && user[0].role === Role.USER) {
                const {data, error} = await createOrder({
                    ...postData,
                    code:  await orderCodeGenerateHelper(),
                    product_id: productSelected.id,
                    client_id: user[0].id
                });
                if (error) {
                    toast.error('Add order has failed !');
                } else {
                    toast.success(`The order ${data.name} has been added !`);
                    handleClose(true);
                }
            } else {
                toast.error(`Client with the username ${postData.client} doesn't exist !`)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const editOrder = async (patchData: OrderFormType): Promise<void> => {
        try {
            const {user, errorUser} = await getUserByUsername(patchData.client);
            delete patchData.client;
            if (!errorUser && user[0].role === Role.USER) {
                const {data, error} = await updateOrder({
                    ...patchData,
                    product_id: productSelected.id,
                    client_id: user[0].id
                }, order.id);
                if (error) {
                    toast.error('Edit order has failed !');
                } else {
                    toast.success(`The order ${data.name} has been edited !`);
                    handleClose(true);
                }
            } else {
                toast.error(`Client with the username ${patchData.client} doesn't exist !`)
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <HeaderFormModal
                title={!!order ? 'Edit an order' : 'Add an order'}
                handleClose={handleClose}
            />
            <form onSubmit={handleSubmit(!!order ? editOrder : addOrder)}
                  className={classes.form}>
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <InputLabel htmlFor="client">Client username</InputLabel>
                    <Input
                        type="text"
                        className="input-group"
                        name="client"
                        defaultValue={!!order ? order?.client.username : null}
                        placeholder={'Client username'}
                        id="client-input"
                        {...register('client', {required: 'This field is required.'})}
                        error={!!errors.client}
                    />
                    {errors.client && <ErrorInputForm errorMessage={errors.client.message}/>}
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="select-product">Choose a product</InputLabel>
                    <Select
                        labelId="select-product"
                        id="select-product"
                        label="Product"
                        name="product"
                        defaultValue={productSelected ? productSelected.name : null}
                    >
                        {!!products && products.length !== 0 && products.map((product: ProductModel) =>
                            <MenuItem
                                key={product.name}
                                value={product.name}
                                onClick={() => setProductSelected(product)}
                            >
                                {`${product.name} (${product.game.name})`}
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <InputLabel htmlFor="currency">Currency</InputLabel>
                    <Input
                        type="text"
                        className="input-group"
                        name="currency"
                        defaultValue={!!order ? order?.currency : null}
                        placeholder={'Currency'}
                        id="currency-input"
                        {...register('currency', {required: 'This field is required.'})}
                        error={!!errors.currency}
                    />
                    {errors.currency && <ErrorInputForm errorMessage={errors.currency.message}/>}
                </FormControl>
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <InputLabel htmlFor="amount">Amount</InputLabel>
                    <Input
                        type="number"
                        className="input-group"
                        name="amount"
                        defaultValue={!!order ? order.amount : null}
                        placeholder={'Amount'}
                        id="amount-input"
                        {...register('amount', {required: 'This field is required.', valueAsNumber: true})}
                        error={!!errors.amount}
                    />
                    {errors.amount && <ErrorInputForm errorMessage={errors.amount.message}/>}
                </FormControl>
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <InputLabel htmlFor="vat">VAT</InputLabel>
                    <Input
                        type="number"
                        className="input-group"
                        name="vat"
                        defaultValue={!!order ? order.vat : null}
                        placeholder={'VAT'}
                        id="vat-input"
                        {...register('vat', {required: 'This field is required.', valueAsNumber: true})}
                        error={!!errors.vat}
                    />
                    {errors.vat && <ErrorInputForm errorMessage={errors.vat.message}/>}
                </FormControl>
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <FormLabel className={classes.labelDescription} htmlFor="details">Details</FormLabel>
                    <DraftEditor name={'details'} contentEditor={order?.details} setValue={setValue}/>
                </FormControl>
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <FormLabel className={classes.labelDescription} htmlFor="comment">Comment</FormLabel>
                    <DraftEditor name={'comment'} contentEditor={order?.comment} setValue={setValue}/>
                </FormControl>
                <Button
                    sx={{marginTop: '1rem'}}
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting || !isValid}
                >
                    {!!order ? 'Edit' : 'Create'}
                </Button>
            </form>
        </>
    )
}

export default FormOrder;
