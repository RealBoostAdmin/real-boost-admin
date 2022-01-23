import React, {ReactElement, useCallback, useEffect} from 'react';
import {supabase} from '../../../core/supabase/client';
import {useDispatch, useSelector} from 'react-redux';
import {logout, patchAuthState} from '../../../core/store/auth/auth.actions';
import {UserModel} from "../../../core/models/user/user.model";
import {IsAuthenticated, UserAuthenticated} from "../../../core/store/auth/auth.selector";

interface CheckAuthType {
    children: ReactElement<any, any>;
}

const CheckAuth = ({children}: CheckAuthType) => {
    const dispatch = useDispatch();
    const user: UserModel = useSelector(UserAuthenticated);
    const isAuthenticated = useSelector(IsAuthenticated);

    const loadProfile = useCallback(async () => {
        // Check active sessions and sets the user
        if (user) {
            const session: any = await supabase.auth.session();

            if ((!user || !session) && isAuthenticated) dispatch(logout());
            if (session) await dispatch(patchAuthState({session}));
        }
    }, [dispatch]);

    useEffect(() => {
        const authListener = async () => {
            await loadProfile();
            // Listen for changes on auth state (logged in, signed out, etc.)
            const {data: listener} = await supabase.auth.onAuthStateChange(
                async () => {
                    await loadProfile();
                }
            )

            return () => {
                listener?.unsubscribe()
            }
        };
        authListener();
    }, [loadProfile]);

    return (<>{children}</>);

};

export default CheckAuth;
