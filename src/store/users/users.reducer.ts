import {on, createReducer} from "@ngrx/store";
import {UserState} from "../../app/shared/interface";
import {
  loginUser,
  loginUserFailed,
  loginUserSuccess, logOut,
  registerUser,
  registerUserFailed,
  registerUserSuccess
} from "./users.actions";

export const initialUserState: UserState = {
  users: [],
  currentUser: null,
  isAuthenticated: false,
  error: null
};
export const usersReducer=createReducer(
  initialUserState,
  on(registerUserSuccess,(state, {user}) => ({
    ...state,
    currentUser: user,
    isAuthenticated: true,
    users:[...state.users, user],
    error:null
  })),
on(registerUserFailed, (state, {error})=>({
    ...state,
    error,
  isAuthenticated: false
  })),

on(loginUser, (state, {email, password})=>({
  ...state,
  error:null
})),
  on(loginUserSuccess, (state, {user})=>({
    ...state,
    user,
    isAuthenticated:true,
    currentUser:user,
    error:null
  })),
  on(loginUserFailed, (state, {error})=>({
    ...state,
    isAuthenticated:false,
    error
  })),
  on(logOut, (state, {})=>({
    ...state,
    isAuthenticated:false,
    error:null,
    currentUser:null,

  }))

)
