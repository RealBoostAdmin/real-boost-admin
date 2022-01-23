import {supabase} from '../../supabase/client';
import {
    AuthModel,
    PostAuthModel,
    RequestResetPasswordAuthModel,
    ResetPasswordAuthModel
} from '../../models/auth/auth.model';

export const postSignIn: AuthModel[] | any = async (data: PostAuthModel) => {
    const {user: authUser, session, error} = await supabase.auth.signIn({
        email: data.email,
        password: data.password,
    });

    return {authUser, session, error};
};

export const postSignUp: any = async (data: PostAuthModel) => {
    await supabase.auth.signUp({
            email: data.email,
            password: data.password,
        },
        {
            data: {
                username: data.username
            }
        });
};

export const requestResetPasswordWithEmail: any = async (datas: RequestResetPasswordAuthModel) => {
    const {error} = await supabase.auth.api
        .resetPasswordForEmail(
            datas.email,
            {
                redirectTo: 'http://localhost:3000/reset-password/'
            }
        )
    return {error};
}

export const resetPassword: any = async (datas: ResetPasswordAuthModel) => {
    const {data, error} = await supabase.auth.api
        .updateUser(datas.accessToken, {password: datas.password})

    return {data, error};
}

export const signOut: any = async () => {
    const {error} = await supabase.auth.signOut()

    return {error};
}
