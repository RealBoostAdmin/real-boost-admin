export interface PostAuthModel {
    email: string;
    username: string; // for user model
    password: string;
}

export interface RequestResetPasswordAuthModel {
    email: string;
}

export interface ResetPasswordAuthModel {
    accessToken?: string;
    password: string;
}

export interface AuthModel {
    id: string;
    email?: string;
    password?: string;
    created_at: Date;
    updated_at: Date;
}
