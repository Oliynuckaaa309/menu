import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable, tap} from 'rxjs';
import { User, LoginResponse } from '../../../shared/interface';
import { apiKey } from '../../../../enviroments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 userNameSubject= new BehaviorSubject<string | null>(null);
  userName$= this.userNameSubject.asObservable();
  constructor(private http: HttpClient) {

  }
  registerUser(user:User){
    this.userNameSubject.next(user.firstname);
  }
  addUser(user:User):Observable<User>{
    return this.http.post<User>(`${apiKey}/users`, user);
  }

  logOut(){
    this.userNameSubject.next(null);
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  }

  login(email: string, password: string): Observable<any> {
     return this.http.post<LoginResponse>(`${apiKey}/login`, {email, password}).pipe(
       tap(response => {
         const { token, user } = response;
         localStorage.setItem('token', token);
         localStorage.setItem('currentUser', JSON.stringify(user));
         this.userNameSubject.next(user.firstname);
       }),
       map(response => response),
     );

  }
}
