import {AnyAction} from 'redux';
import {TranslationModel} from '../../models/translation/translation.model';

export const GET_TRANSLATIONS_STATE = 'GET_TRANSLATIONS_STATE';
export const POST_TRANSLATION_STATE = 'POST_TRANSLATION_STATE';
export const PATCH_TRANSLATION_STATE = 'PATCH_TRANSLATION_STATE';
export const PATCH_TRANSLATION_SELECTED_STATE = 'PATCH_TRANSLATION_SELECTED_STATE';
export const DELETE_TRANSLATION_STATE = 'DELETE_TRANSLATION_STATE';

export const getTranslationsState = (payload: { translations: TranslationModel[] }): AnyAction => ({
    type: GET_TRANSLATIONS_STATE,
    payload: payload
});

export const postTranslationState = (payload: { translation: TranslationModel }): AnyAction => ({
    type: POST_TRANSLATION_STATE,
    payload: payload
});

export const patchTranslationState = (payload: { translation: TranslationModel }, id: string): AnyAction => ({
    type: PATCH_TRANSLATION_STATE,
    payload: payload,
    id: id
});

export const patchTranslationSelectedState = (payload: { translationSelected: TranslationModel }): AnyAction => ({
    type: PATCH_TRANSLATION_SELECTED_STATE,
    payload: payload
});

export const deleteTranslationState = (id: string): AnyAction => ({
    type: DELETE_TRANSLATION_STATE,
    id: id
})

