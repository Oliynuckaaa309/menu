import {createAction, props} from "@ngrx/store";
import {User} from "../../app/shared/interface";

export const registerUser = createAction('[User] Register user', props<{ user: User }>());
export const registerUserSuccess = createAction('[User] Register user success', props<{ user: User }>());
export const registerUserFailed = createAction('[User] Register user failed', props<{ error: string }>())

export const loginUser = createAction('[Auth] Login user', props<{ email: string, password: string }>());
export const loginUserSuccess = createAction('[Auth] Login user success', props<{ user: User, token: string }>());
export const loginUserFailed = createAction('[Auth] Login user failed', props<{ error: string }>());
export const logOut = createAction('[Auth] Logout user');
