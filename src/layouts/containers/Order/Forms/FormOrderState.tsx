import {FormControl} from '@mui/material';
import React from 'react';
import {makeStyles} from '@mui/styles';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import {useForm} from 'react-hook-form';
import HeaderFormModal from '../../../components/Forms/HeaderFormModal/HeaderFormModal';
import {toast} from 'react-toastify';
import ErrorInputForm from '../../../components/Errors/ErrorInputForm/ErrorInputForm';
import {OrderStateModel} from "../../../../core/models/order_state/order_state.model";
import {getUserByUsername} from "../../../../core/service/user/user.service";
import {Role} from "../../../../core/models/user/user.model";
import {createModelHelper, updateModelHelper} from "../../../../core/helpers/query/query.helper";
import {OrderModel} from "../../../../core/models/order/order.model";

type OrderStateFormType = {
    interested: string;
    username: string;
}

interface IAddOrderStateProps {
    order: OrderModel;
    orderState?: OrderStateModel | null;
    handleClose: (updated?: boolean) => void;
}

const useStyles = makeStyles(() => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}))

const FormOrderState: React.FC<IAddOrderStateProps> = ({
                                                           order,
                                                           orderState,
                                                           handleClose
                                                       }) => {
    const classes = useStyles();
    const {register, formState, handleSubmit} = useForm<OrderStateFormType>({mode: 'onChange'})
    const {isSubmitting, errors, isValid} = formState;

    const addOrderState = async (postData: OrderStateFormType): Promise<void> => {
        try {
            const {user, errorUser} = await getUserByUsername(postData.username);
            delete postData.username;
            if (!errorUser && user[0].role === Role.BOOSTER) {
                const {data, error} = await createModelHelper('order_states', {
                    user_id: user[0].id,
                    order_id: order.id,
                    interested: 1
                });
                if (error) {
                    toast.error('Add order state has failed !');
                } else {
                    toast.success(`The order state ${data.name} has been added !`);
                    handleClose(true);
                }
            } else {
                toast.error(`Client with the username ${postData.username} doesn't exist !`)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const editOrderState = async (patchData: OrderStateFormType): Promise<void> => {
        try {
            const {user, errorUser} = await getUserByUsername(patchData.username);
            delete patchData.username;
            if (!errorUser && user[0].role === Role.BOOSTER) {
                const {data, error} = await updateModelHelper('order_states', {
                    user_id: user[0].id,
                    order_id: order.id,
                    interested: 1
                }, orderState.id);
                if (error) {
                    toast.error('Edit order state has failed !');
                } else {
                    toast.success(`The order state ${data.name} has been edited !`);
                    handleClose(true);
                }
            } else {
                toast.error(`Client with the username ${patchData.username} doesn't exist !`)
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <HeaderFormModal
                title={orderState ? 'Edit order state' : 'Add order state'}
                handleClose={handleClose}
            />
            <form onSubmit={handleSubmit(orderState ? editOrderState : addOrderState)}
                  className={classes.form}>
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <InputLabel htmlFor="username">Client username</InputLabel>
                    <Input
                        type="text"
                        className="input-group"
                        name="username"
                        defaultValue={!!orderState ? orderState.user.username : null}
                        placeholder={'Client username'}
                        id="username-input"
                        {...register('username', {required: 'This field is required.'})}
                        error={!!errors.username}
                    />
                    {errors.username && <ErrorInputForm errorMessage={errors.username.message}/>}
                </FormControl>
                <Button
                    sx={{marginTop: '1rem'}}
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting || !isValid}
                >
                    {orderState ? 'Edit' : 'Create'}
                </Button>
            </form>
        </>
    )
}

export default FormOrderState;
