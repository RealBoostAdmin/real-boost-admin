import {QuestionModel} from '../../../../core/models/question/question.model';
import React, {useEffect, useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {ProductModel} from '../../../../core/models/product/product.model';
import {toast} from 'react-toastify';
import {useForm} from 'react-hook-form';
import {
    createQuestionProduct,
    getQuestionProduct
} from '../../../../core/service/question_product/questionProduct.service';
import Button from '@mui/material/Button';
import {FormControl} from '@mui/material';
import {makeStyles} from '@mui/styles';

interface IPropsFormAddQuestionOfProduct {
    questions: QuestionModel[];
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

const FormAddQuestionOfProduct: React.FC<IPropsFormAddQuestionOfProduct> = ({questions, product, setDate}) => {
    const [question, setQuestion] = useState<QuestionModel>(questions[0]);
    const {formState, handleSubmit} = useForm({mode: 'onChange'})
    const {isSubmitting, isValid} = formState;
    const classes = useStyles();

    const addQuestionOfProduct = async () => {
        try {
            const {data} = await getQuestionProduct(question.id, product.id);
            if (data && data.length === 0 ) {
                const {errorQuestionProduct} = await createQuestionProduct({question_id: question.id, product_id: product.id});
                if (errorQuestionProduct) {
                    toast.error(`Create question of product ${product.name} has failed !`)
                } else {
                    toast.success(`Create of the question ${data.name} of product ${product.name} has failed`)
                    setDate();
                }
            } else {
                toast.error(`Question ${question.name} is already associated to the product ${product.name}`);
            }
        } catch (error) {
            console.log(error);
            toast.error(`Create question of product ${product.name} has failed !`)
        }
    }

    return (
        questions && questions.length !== 0 && (
            <form onSubmit={handleSubmit(addQuestionOfProduct)} className={classes.form}>
                <FormControl>
                <InputLabel id="demo-simple-select-label">Add question to the product</InputLabel>
                <Select
                    labelId="select-label-name"
                    id="select-name"
                    label="Question name"
                    defaultValue={questions[0].name}
                >
                    {questions.length !== 0 && questions.map((question: QuestionModel) =>
                        <MenuItem
                            key={question.name}
                            value={question.name}
                            onClick={() => setQuestion(question)}
                        >
                            {question.name}
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

export default FormAddQuestionOfProduct;
