import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User, LoginResponse } from '../../../shared/interface';
import { apiKey } from '../../../../enviroments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
private userNameSubject= new BehaviorSubject<string | null>(null);
userName$= this.userNameSubject.asObservable();
  constructor(private http: HttpClient) { }
  registerUser(user:User){
    this.userNameSubject.next(user.firstName);
  }
  logOut(){
    this.userNameSubject.next(null);
  }

  login(email: string, password: string): Observable<LoginResponse> {
     return this.http.get<User[]>(apiKey+'/users').pipe(
      map(users => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          return { success: true, user }; 
        } 
       
        else {
          throw new Error('Invalid credentials');
        }
      })
    );
 
  }
}