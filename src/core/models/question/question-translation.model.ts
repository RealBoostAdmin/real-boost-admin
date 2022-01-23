import {TranslationModel} from '../translation/translation.model';
import {QuestionModel} from './question.model';

export interface PostQuestionTranslationModel {
    title: string;
    content: string;
    translation_id: string;
    question_id: string;
}

export interface PatchQuestionTranslationModel {
    title?: string;
    content?: string;
}

export interface QuestionTranslationModel {
    id: string;
    title: string;
    content: string;
    question: QuestionModel;
    translation: TranslationModel
    created_at: Date;
    updated_at: Date;
}
