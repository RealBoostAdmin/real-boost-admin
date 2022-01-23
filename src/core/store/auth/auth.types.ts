import {UserModel} from "../../models/user/user.model";

export interface IAuthState {
    loading: boolean;
    user: UserModel | null;
    session: any | null;
    error: any | null;
}
