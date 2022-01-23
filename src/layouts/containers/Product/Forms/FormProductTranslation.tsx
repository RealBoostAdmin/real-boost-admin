import {FormControl} from '@mui/material';
import React from 'react';
import {makeStyles} from '@mui/styles';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import {useForm} from 'react-hook-form';
import {toast} from 'react-toastify';
import ErrorInputForm from '../../../components/Errors/ErrorInputForm/ErrorInputForm';
import {TranslationModel} from '../../../../core/models/translation/translation.model';
import DraftEditor from '../../../components/DraftEditor/DraftEditor';
import FormLabel from '@mui/material/FormLabel';
import {ProductModel} from '../../../../core/models/product/product.model';
import {ProductTranslationModel} from '../../../../core/models/product/product-translation.model';
import {createProductTranslation, updateProductTranslation} from '../../../../core/service/product/productTranslation.service';

type ProductTranslationFormType = {
    name: string;
    rules: string
}

interface IFormProductTranslation {
    product: ProductModel;
    productTranslation?: ProductTranslationModel;
    translationSelected: TranslationModel;
}

const useStyles = makeStyles(() => ({
    form: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: '2rem'
    },
    labelContent: {
        fontWeight: '700 !important'
    }
}))

const FormProductTranslation: React.FC<IFormProductTranslation> = ({
                                                                       product,
                                                                       productTranslation,
                                                                       translationSelected
                                                                   }) => {
    const classes = useStyles();
    const {register, formState, handleSubmit, setValue} = useForm<ProductTranslationFormType>({mode: 'onChange'})
    const {isSubmitting, errors, isValid} = formState;

    const addProductTranslation = async (postData: ProductTranslationFormType): Promise<void> => {
        try {
            const {error} = await createProductTranslation({
                ...postData,
                translation_id: translationSelected.id,
                product_id: product.id
            });
            error
                ? toast.error('Add product translation has failed !')
                : toast.success(`The product ${product.name} has been translated in ${translationSelected.code} !`);
        } catch (error) {
            console.log(error);
        }
    };

    const editProductTranslation = async (patchData: ProductTranslationFormType): Promise<void> => {
        try {
            const {error} = await updateProductTranslation({...patchData}, productTranslation.id);
            error
                ? toast.error(`Edit the product ${product.name} in ${translationSelected.code} has failed !`)
                : toast.success(`The product ${product.name} has been edited in ${translationSelected.code} !`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(productTranslation ? editProductTranslation : addProductTranslation)}
                  className={classes.form}>
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <Input
                        type="text"
                        className="input-group"
                        name="name"
                        defaultValue={productTranslation ? productTranslation?.name : null}
                        id="name-input"
                        {...register('name')}
                        error={!!errors.name}
                    />
                    {errors.name && <ErrorInputForm errorMessage={errors.name.message}/>}
                </FormControl>
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <FormLabel className={classes.labelContent} htmlFor="content">Description</FormLabel>
                    <DraftEditor name={'description'} contentEditor={productTranslation?.description}
                                 setValue={setValue}/>
                </FormControl>
                <Button
                    sx={{marginTop: '1rem'}}
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting || !isValid}
                >
                    {productTranslation ? 'Edit' : 'Create'}
                </Button>
            </form>
        </>
    )
}

export default FormProductTranslation;
