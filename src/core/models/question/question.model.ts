import {FilterModel} from '../utils/filters/filter.model';
import {QuestionTranslationModel} from './question-translation.model';
import {QuestionProductModel} from '../question_product/question_product';

export interface QuestionModel {
    id: string;
    name: string;
    questionTranslations?: QuestionTranslationModel[] | [];
    questionProducts?: QuestionProductModel[] | [];
    created_at: Date;
    updated_at: Date;
}

export interface PostQuestionModel {
    name: string;
}

export interface PatchQuestionModel {
    name?: string;
}

export interface QuestionFilterModel {
    name: FilterModel[];
}
