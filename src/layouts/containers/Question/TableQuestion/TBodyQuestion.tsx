import React from 'react';
import {TableBody, TableCell, TableRow} from '@mui/material';
import ActionButton from '../../../components/Table/ActionButtons/ActionButtons';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router';
import {QuestionModel} from '../../../../core/models/question/question.model';
import {deleteQuestion} from '../../../../core/service/question/question.service';
import EditRelationButton from '../../../components/Table/EditRelationButton/EditRelationButton';
import {
    deleteQuestionProduct,
    getQuestionProduct
} from '../../../../core/service/question_product/questionProduct.service';
import {ProductModel} from '../../../../core/models/product/product.model';

interface ITypesTBodyQuestion {
    product?: ProductModel;
    handleOpen?: (question?: QuestionModel) => void;
    questions: QuestionModel[];
    setDate: () => void;
    editable?: boolean;
}

const TBodyQuestion = ({
                           product,
                           handleOpen,
                           questions,
                           setDate,
                           editable = true,
                       }: ITypesTBodyQuestion) => {
    const navigate = useNavigate();

    const removeQuestion = async (id: string): Promise<void> => {
        try {
            const {error} = await deleteQuestion(id);
            if (error) {
                toast.error('Delete question has failed !')
            } else {
                toast.success('The question has been removed.')
                setDate();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const removeRelation = async (question: QuestionModel) => {
        if (question && product) {
            try {
                const query = await getQuestionProduct(question.id, product.id); // Check if data already exists
                if (query.data && query.data.length !== 0) {
                    const {error} = await deleteQuestionProduct(query.data[0].id);
                    if (error) {
                        toast.error(`Delete on Relation between the question ${question.name} and the product ${product.name} has failed !`);
                    } else {
                        toast.success(`Relation between the question ${question.name} and the product ${product.name} has been deleted !`);
                        setDate();
                    }
                }
            } catch (error) {
                toast.error(`Error on removing relation between question and product !`);
                console.log(error);
            }
        }
    }

    return (
        <TableBody>
            {(questions && questions.length !== 0) && (
                questions.length !== 0 && questions.map((question: QuestionModel) => (
                    <TableRow key={question.id} hover role="checkbox" tabIndex={-1}>
                        <TableCell
                            key={question.name}
                            align={'center'}
                            sx={{cursor: 'pointer'}}
                            onClick={() => navigate(`../question/${question.id}`)}>
                            <b>{question.name}</b>
                        </TableCell>
                        {editable &&
                        <ActionButton
                            model={question}
                            handleOpen={handleOpen}
                            deleteItem={removeQuestion}
                        />
                        }
                        {product && <EditRelationButton model={question} editRelation={removeRelation}/>}
                    </TableRow>
                ))
            )}
        </TableBody>
    )
}

export default TBodyQuestion;
