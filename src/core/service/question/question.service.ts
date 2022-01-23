import {supabase} from '../../supabase/client';
import {FilterModel} from '../../models/utils/filters/filter.model';
import {
    PatchQuestionModel,
    PostQuestionModel,
    QuestionFilterModel,
    QuestionModel
} from '../../models/question/question.model';
import {FilterEnabledModel} from '../../models/utils/filters/filterEnabled.model';
import {filtersHelper} from "../../helpers/filters/filters.helper";

export const getQuestion: QuestionModel | any = async (id: string) => {

    let query = supabase
        .from('questions')
        .select('*')
        .match({id: id})
        .limit(1)
        .single()

    return query;
}

export const getQuestionsWithoutPagination: QuestionModel[] | any = async (
    sort: string = 'name',
) => {
    let query = supabase
        .from('questions')
        .select('*')

    query.order(sort)

    return query;
}

export const getQuestions: QuestionModel[] | any = async (
    filtersEnabled?: FilterEnabledModel[] | null,
    currentPage: number = 1,
    search?: string | null,
    sort: string = 'created_at',
    limit: number | null = 10
) => {
    const startRange = (currentPage * limit) - limit;
    const endRange = currentPage * limit - 1;

    let query = supabase
        .from('questions')
        .select('*')
        .range(startRange, endRange)

    filtersEnabled && filtersEnabled.forEach((filterEnabled: FilterEnabledModel) => {
        query = filtersHelper(filterEnabled, query)
    });
    if (search) query.or(`name.ilike.%${search}%`)

    query.order('name')

    return query;
}

export const getCountQuestions = async (
    filtersEnabled?: FilterEnabledModel[] | null,
    search?: string | null,
) => {
    let query = supabase
        .from('questions')
        .select('name', {count: 'exact'})

    filtersEnabled && filtersEnabled.forEach((filterEnabled: FilterEnabledModel) => {
        query = filtersHelper(filterEnabled, query)
    });
    if (search) query.or(`name.ilike.%${search}%`)

    return query;
}

export const getFiltersQuestion = async () => {
    const {data: questionData, error} = await supabase
        .from('questions')
        .select('name')

    const questionsName: FilterModel[] = [];

    questionData.forEach((item: any) => {
        questionsName.push({id: item.name, label: item.name})
    });

    const listValues: QuestionFilterModel = {
        name: questionsName,
    };

    return {listValues, error};
}

export const createQuestion: any = async (postQuestionData: PostQuestionModel) => {
    const {data, error} = await supabase
        .from('questions')
        .insert([postQuestionData])
        .single();

    return {data, error};
}

export const updateQuestion: any = async (patchQuestionData: PatchQuestionModel, id: string) => {
    const {data, error} = await supabase
        .from('questions')
        .update(patchQuestionData)
        .match({id: id})
        .single();

    return {data, error};
}

export const deleteQuestion: any = async (id: string) => {
    const {data, error} = await supabase
        .from('questions')
        .delete()
        .match({id: id})

    return {data, error};
}
