import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, exhaustMap, map,} from 'rxjs/operators';
import { of } from 'rxjs';
import {
  loginUser, loginUserFailed, loginUserSuccess,
  registerUser, registerUserFailed,
  registerUserSuccess,

} from './users.actions';
import {AuthService} from "../../app/core/services/auth/auth.service";
import {LoginResponse} from "../../app/shared/interface";

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private authService:AuthService) {}

 registerUser$=createEffect(()=>
 this.actions$.pipe(
   ofType(registerUser),
   exhaustMap(({user})=>
   this.authService.addUser(user).pipe(
     map(user =>
       registerUserSuccess({ user })),
       catchError(error=>of(registerUserFailed({error})))
   ))
 ));
  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUser),
      exhaustMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map((response: LoginResponse) => {
            if (response) {
              return loginUserSuccess({ user: response.user, token:response.token});
            } else {
              return loginUserFailed({ error: 'Login failed' });
            }
          }),
        )
      )
    )
  );

}
