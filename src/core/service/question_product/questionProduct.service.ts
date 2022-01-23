
import {PostQuestionProductModel} from '../../models/question_product/question_product';
import {supabase} from '../../supabase/client';
import {QuestionModel} from '../../models/question/question.model';

export const getQuestionsOfProduct: QuestionModel[] | any = async (productId: string) => {

    let query = supabase
        .from('_questions_products')
        .select('*')
        .eq('question_product->>product_id', productId)

    return query;
}

export const getQuestionProduct: QuestionModel | any = async (questionId: string, productId: string) => {

    let query = supabase
        .from('questions_products')
        .select('*')
        .match({question_id: questionId, product_id: productId})
        .limit(1)

    return query;
}

export const createQuestionProduct: any = async (postQuestionData: PostQuestionProductModel) => {
    const {data, error: errorQuestionProduct} = await supabase
        .from('questions_products')
        .insert([postQuestionData])
        .single();

    return {data, errorQuestionProduct};
}

export const deleteQuestionProduct: any = async (id: string) => {
    const {data, error} = await supabase
        .from('questions_products')
        .delete()
        .match({id: id})

    return {data, error};
}
