import React from 'react';
import {TableBody, TableCell, TableRow} from '@mui/material';
import ActionButton from '../../../../components/Table/ActionButtons/ActionButtons';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router';
import {ProductModel} from '../../../../../core/models/product/product.model';
import {deleteProduct} from '../../../../../core/service/product/product.service';

interface IPropsTBodyProduct {
    handleOpen: (product?: ProductModel) => void;
    products: ProductModel[];
    setDate: () => void;
}

const TBodyProduct = ({
                          handleOpen,
                          products,
                          setDate
                      }: IPropsTBodyProduct) => {
    const navigate = useNavigate();

    const removeProduct = async (id: string): Promise<void> => {
        try {
            const {error} = await deleteProduct(id);
            if (error) {
                toast.error('Delete product has failed !')
            } else {
                toast.success('The product has been removed.')
                setDate();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <TableBody>
            {(products && products.length !== 0) && (
                products.length !== 0 && products.map((product: ProductModel) => (
                    <TableRow key={product.name} hover role="checkbox" tabIndex={-1}>
                        <TableCell
                            align={'center'}
                            sx={{cursor: 'pointer'}}
                            onClick={() => navigate(`../product/${product.name}`)}>
                            <b>{product.name}</b>
                        </TableCell>
                        <TableCell align={'center'}>
                            {product.game.name}
                        </TableCell>
                        <ActionButton
                            model={product}
                            handleOpen={handleOpen}
                            deleteItem={removeProduct}
                        />
                    </TableRow>
                ))
            )}
        </TableBody>
    )
}

export default TBodyProduct;
