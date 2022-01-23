import React, {useEffect, useState} from 'react';
import {ProductModel} from '../../../../../core/models/product/product.model';
import {toast} from 'react-toastify';
import HeadSection from '../../../../components/HeadSection/HeadSection';
import {Paper, TableContainer} from '@mui/material';
import Table from '@mui/material/Table';
import {QuestionModel} from '../../../../../core/models/question/question.model';
import THeadQuestion from '../../../Question/TableQuestion/THeadQuestion';
import TBodyQuestion from '../../../Question/TableQuestion/TBodyQuestion';
import {getQuestionsOfProduct} from '../../../../../core/service/question_product/questionProduct.service';
import FormAddQuestionOfProduct from '../../Forms/FormAddQuestionOfProduct';
import {getQuestionsWithoutPagination} from '../../../../../core/service/question/question.service';

interface IPropsTabQuestions {
    product: ProductModel;
}

const TabQuestions: React.FC<IPropsTabQuestions> = ({product}) => {
    const [questions, setQuestions] = useState<QuestionModel[]>([]);
    const [questionsOfProduct, setQuestionsOfProduct] = useState<QuestionModel[]>();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [date, setDate] = useState<Date>(new Date());

    useEffect(() => {
        const fetchQuestionsOfProduct = async () => {
            try {
                setLoading(true);
                const {data, error} = await getQuestionsOfProduct(product.id);
                if (error) {
                    setErrorMessage('Loading questions of product has failed !');
                    toast.error('Loading questions of product has failed !')
                } else {
                    setQuestionsOfProduct(data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchQuestionsOfProduct();
    }, [date])

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const {data, error} = await getQuestionsWithoutPagination();
                error ? toast.error('Loading questions has failed !') : setQuestions(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchQuestions();
    }, [])

    return (
        <>
            <HeadSection title={`Attribute questions to the product : ${product.name}`}/>
            {questions && questions.length !== 0 && <FormAddQuestionOfProduct questions={questions} product={product} setDate={() => setDate(new Date())}/>}
            {questionsOfProduct && questionsOfProduct.length !== 0 ? (
                    <>
                        <Paper>
                            <TableContainer>
                                <Table>
                                    <THeadQuestion/>
                                    <TBodyQuestion
                                        product={product}
                                        questions={questionsOfProduct}
                                        setDate={() => setDate(new Date())}
                                        editable={false}
                                    />
                                </Table>
                            </TableContainer>
                        </Paper>
                    </>
                )
                : loading ? (
                    <p>Loading</p>
                ) : errorMessage ? (
                    <p>{errorMessage}</p>
                ) : (
                    <p>No questions available</p>
                )}
        </>
    )
}

export default TabQuestions;
