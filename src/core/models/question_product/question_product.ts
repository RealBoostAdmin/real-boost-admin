export interface PostQuestionProductModel {
    question_id: string;
    product_id: string;
}

export interface QuestionProductModel {
    id: string;
    question_id: string;
    product_id: string;
    created_at: Date;
    updated_at: Date;
}
