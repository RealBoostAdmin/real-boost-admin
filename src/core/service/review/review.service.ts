import {supabase} from '../../supabase/client';
import {PatchReviewModel, PostReviewModel} from "../../models/review/review.model";

export const createReview: any = async (postReviewData: PostReviewModel) => {
    const {data, error} = await supabase
        .from('reviews')
        .insert([postReviewData])
        .single();

    return {data, error};
}

export const updateReview: any = async (patchReviewData: PatchReviewModel, id: string) => {
    const {data, error} = await supabase
        .from('reviews')
        .update(patchReviewData)
        .match({id: id})
        .single();

    return {data, error};
}

export const deleteReview: any = async (id: string) => {
    const {data, error} = await supabase
        .from('reviews')
        .delete()
        .match({id: id})

    return {data, error};
}
