import {supabase} from '../../supabase/client';
import {
    PatchQuestionTranslationModel,
    PostQuestionTranslationModel,
    QuestionTranslationModel
} from '../../models/question/question-translation.model';

export const getQuestionTranslation: QuestionTranslationModel | any = async (
    questionId: string,
    translationId: string
) => {
    const {data: dataTranslation, error: errorTranslation} = await supabase
        .from('question_translations')
        .select(`*`)
        .match({question_id: questionId, translation_id: translationId})
        .limit(1)

    return {dataTranslation, errorTranslation};
}

export const createQuestionTranslation: any = async (
    {title, content}: PostQuestionTranslationModel,
    translationId: string,
    questionId: string
) => {
    const {data, error} = await supabase
        .from('question_translations')
        .insert([{title, content, translation_id: translationId, question_id: questionId}])
        .single();

    return {data, error};
}

export const updateQuestionTranslation: any = async (
    patchQuestionData: PatchQuestionTranslationModel,
    questionTranslationId: string,
) => {
    const {data, error} = await supabase
        .from('question_translations')
        .update(patchQuestionData)
        .match({id: questionTranslationId})
        .single();

    return {data, error};
}
