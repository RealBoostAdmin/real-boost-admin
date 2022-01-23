import {RootState} from '../store.reducer';

export const IsAuthenticated = (store: RootState) => !!store.auth.session && !!store.auth.user

export const UserAuthenticated = (store: RootState) => store.auth.user

export const AccessToken = (store: RootState): string => {
    return store?.auth?.session?.access_token;
}
