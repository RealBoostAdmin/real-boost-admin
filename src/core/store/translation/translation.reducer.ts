import {
    ITranslationState
} from './translation.types';
import translationDefault from './translation.default';
import * as actions from './translation.actions'
import {AnyAction} from 'redux';
import {TranslationModel} from '../../models/translation/translation.model';

export function translationReducer(
    state = translationDefault,
    action: AnyAction
): ITranslationState {
    switch (action.type) {
        case actions.GET_TRANSLATIONS_STATE: {
            return {
                ...state,
                ...action.payload,
                loading: false,
                error: null,
            }
        }
        case actions.POST_TRANSLATION_STATE: {
            return {
                ...state,
                translations: [...state.translations, action.payload],
                loading: false,
                error: null,
            }
        }
        case actions.PATCH_TRANSLATION_STATE: {
            return {
                ...state,
                translations: state.translations.map((translation: TranslationModel) => {
                    if (translation.id !== action.id) return translation;
                    return {...translation, ...action.payload}
                }),
                loading: false,
                error: null,
            }
        }
        case actions.PATCH_TRANSLATION_SELECTED_STATE: {
            return {
                ...state,
                ...action.payload,
                loading: false,
                error: null,
            }
        }
        case actions.DELETE_TRANSLATION_STATE: {
            return {
                ...state,
                translations: state.translations.filter((translation: TranslationModel) => translation.id !== action.id),
                loading: false,
                error: null,
            }
        }
        default:
            return state;
    }
}
