import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {TranslationSelected} from '../../../../core/store/translation/translation.selector';
import {toast} from 'react-toastify';
import HeadSection from '../../../components/HeadSection/HeadSection';
import {useParams} from 'react-router';
import Paper from '@mui/material/Paper';
import {ProductTranslationModel} from '../../../../core/models/product/product-translation.model';
import {ProductModel} from '../../../../core/models/product/product.model';
import FormProductTranslation from '../Forms/FormProductTranslation';
import {getProduct} from '../../../../core/service/product/product.service';
import {getProductTranslation} from '../../../../core/service/product/productTranslation.service';
import TabsProduct from "../TabsProduct/TabsProduct";

const ProductTranslationPage: React.FC = () => {
    const translationSelected = useSelector(TranslationSelected);
    const [productTranslation, setProductTranslation] = useState<ProductTranslationModel>();
    const [product, setProduct] = useState<ProductModel>();
    const {productName} = useParams();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const {data, error} = await getProduct(productName);
                error
                    ? toast.error(`Loading of product failed !`)
                    : setProduct(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchProduct();
    }, [setProduct])

    useEffect(() => {
        const fetchProductTranslation = async () => {
            try {
                setLoading(true);
                const {
                    dataTranslation,
                    errorTranslation
                } = await getProductTranslation(product.id, translationSelected.id);
                errorTranslation
                    ? toast.error(`Loading of product translation data in ${translationSelected.code} failed !`)
                    : setProductTranslation(dataTranslation[0]);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchProductTranslation();
    }, [product, setProductTranslation, translationSelected])

    return (
        <>
            {(!loading && !!product && !!translationSelected) &&
            <Paper sx={{paddingBottom: '2rem'}}>
                <HeadSection
                    title={productTranslation ? `Edit ${product?.name} in ${translationSelected.code}` : `Add ${product?.name} in ${translationSelected.code}`}
                    back={true}
                />
                <FormProductTranslation
                    product={product}
                    productTranslation={productTranslation}
                    translationSelected={translationSelected}
                />
            </Paper>
            }
            {!!product &&
            <Paper sx={{paddingBottom: '2rem'}}>
                <TabsProduct product={product}/>
            </Paper>
            }
        </>
    )
};

export default ProductTranslationPage;
