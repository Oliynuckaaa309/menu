import {createFeatureSelector, createSelector} from "@ngrx/store";
import {UserState} from "../../app/shared/interface";

export const selectUserState= createFeatureSelector<UserState>('users');
export const selectedUserName= createSelector(
  selectUserState,
  (state:UserState)=>state.currentUser
)
