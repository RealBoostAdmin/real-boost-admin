import {
    IAuthState
} from './auth.types';
import authDefault from './auth.default';
import * as actions from './auth.actions'
import {AnyAction} from 'redux';
import {stat} from "fs";

export function authReducer(
    state = authDefault,
    action: AnyAction
): IAuthState {
    switch (action.type) {
        case actions.LOGIN_AUTH_STATE: {
            return {
                ...state,
                ...action.payload,
                loading: false,
                error: null,
            }
        }
        case actions.PATCH_AUTH_STATE: {
            return {
                ...state,
                ...action.payload,
                loading: false,
                error: null,
            }
        }
        case actions.LOGOUT_USER: {
            return authDefault;
        }
        default:
            return state;
    }
}
