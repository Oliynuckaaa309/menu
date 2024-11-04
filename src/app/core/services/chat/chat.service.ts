import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { MessageResponse, UserResponse } from "../../../shared/interface";
import { apiKey } from "../../../../enviroments/environment";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  getAllUsersForSupport(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(`${apiKey}/chat/senders`);
  }

  getPreviousMessage(id: number): Observable<MessageResponse[]> {
    return this.http.get<MessageResponse[]>(`${apiKey}/chat/user/${id}`);
  }
}
