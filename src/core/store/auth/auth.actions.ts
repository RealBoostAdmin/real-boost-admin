import {AnyAction} from 'redux';
import {UserModel} from "../../models/user/user.model";

export const LOGIN_AUTH_STATE = 'LOGIN_AUTH_STATE'
export const LOGOUT_USER = 'LOGOUT_USER'
export const PATCH_AUTH_STATE = 'PATCH_AUTH_STATE'

export const logout = (): AnyAction => ({
    type: LOGOUT_USER,
});

export const patchAuthState = (payload: { session: any }): AnyAction => ({
    type: PATCH_AUTH_STATE,
    payload: payload
});

export const loginAuthState = (payload: { user: UserModel }): AnyAction => ({
    type: LOGIN_AUTH_STATE,
    payload: payload
});
