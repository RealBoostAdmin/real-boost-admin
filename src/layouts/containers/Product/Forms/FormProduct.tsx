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
import {GameModel} from '../../../../core/models/game/game.model';
import {createProduct, updateProduct} from '../../../../core/service/product/product.service';
import {ProductModel} from '../../../../core/models/product/product.model';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

type ProductFormType = {
    name: string;
    rules: string;
}

interface IAddProductProps {
    product?: ProductModel | null;
    handleClose: (updated?: boolean) => void;
    games?: GameModel[];
}

const useStyles = makeStyles(() => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}))

const FormProduct: React.FC<IAddProductProps> = ({
                                                     product,
                                                     handleClose,
                                                     games
                                                 }) => {
    const classes = useStyles();
    const {register, formState, handleSubmit} = useForm<ProductFormType>({mode: 'onChange'})
    const {isSubmitting, errors, isValid} = formState;
    const [gameSelected, setGameSelected] = useState<GameModel>(product ? product.game : null);

    const addProduct = async (postData: ProductFormType): Promise<void> => {
        try {
            const {data, error} = await createProduct({...postData, game_id: gameSelected.id});
            if (error) {
                toast.error('Add product has failed !');
            } else {
                toast.success(`The product ${data.name} has been added !`);
                handleClose(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const editProduct = async (patchData: ProductFormType): Promise<void> => {
        try {
            const {data, error} = await updateProduct({...patchData, game_id: gameSelected.id}, product.id);
            if (error) {
                toast.error('Edit product has failed !');
            } else {
                toast.success(`The product ${data.name} has been edited !`);
                handleClose(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <HeaderFormModal
                title={!!product ? 'Edit a product and his translations' : 'Add a product'}
                handleClose={handleClose}
            />
            <form onSubmit={handleSubmit(!!product ? editProduct : addProduct)}
                  className={classes.form}>
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <InputLabel htmlFor="name">Name of the product</InputLabel>
                    <Input
                        type="text"
                        className="input-group"
                        name="name"
                        defaultValue={!!product ? product?.name : null}
                        placeholder={'Name of Product'}
                        id="name-input"
                        {...register('name', {required: 'This field is required.'})}
                        error={!!errors.name}
                    />
                    {errors.name && <ErrorInputForm errorMessage={errors.name.message}/>}
                </FormControl>
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <InputLabel htmlFor="rules">Rules</InputLabel>
                    <Input
                        type="text"
                        className="input-group"
                        name="rules"
                        defaultValue={!!product ? JSON.stringify(product?.rules) : null}
                        placeholder={'Rules of Product'}
                        id="rules-input"
                        {...register('rules')}
                        error={!!errors.rules}
                    />
                    {errors.rules && <ErrorInputForm errorMessage={errors.rules.message}/>}
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="select-game">Choose a game</InputLabel>
                    <Select
                        labelId="select-game"
                        id="select-game"
                        label="Game"
                        defaultValue={!!product && product?.game ? product.game.name : null}
                    >
                        {!!games && games.length !== 0 && games.map((game: GameModel) =>
                            <MenuItem
                                key={game.name}
                                value={game.name}
                                onClick={() => setGameSelected(game)}
                            >
                                {game.name}
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
                    {!!product ? 'Edit' : 'Create'}
                </Button>
            </form>
        </>
    )
}

export default FormProduct;
