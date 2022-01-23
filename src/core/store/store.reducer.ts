import {AnyAction, combineReducers} from 'redux';
import {authReducer} from './auth/auth.reducer';
import {translationReducer} from './translation/translation.reducer';
import {store} from './store';

const reducers = combineReducers({
    auth: authReducer,
    translation: translationReducer
});

export const RESET_STORE = 'RESET_STORE';

export const resetStore = (): AnyAction => ({
    type: RESET_STORE,
});

export const storeReducer = (state: any, action: any) => {
    if (action.type === RESET_STORE) {
        state = {};
    }

    return reducers(state, action);
};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
