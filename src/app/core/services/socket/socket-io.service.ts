import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from "rxjs";
import { Message, MessageResponse } from "../../../shared/interface";
import { apiKey } from '../../../../enviroments/environment';
@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  private clientSocket: Socket;

  constructor() {
    this.clientSocket = io(apiKey);
  }

  joinRoom(roomId: number) {
    this.clientSocket.emit('joinRoom', {roomId: roomId});
  }

  sendMessage(message: Message) {
    this.clientSocket.emit('SendMessage', message);
  }

  getMessage(): Observable<MessageResponse> {
    return new Observable(observer => {
      this.clientSocket.on('receiveMessage', (message: MessageResponse) => {
        observer.next(message);
      });
    });
  }

  markMessageAsRead(id:number){
    this.clientSocket.emit('WatchedMessage', {id:id});
  }

  disconnect() {
    this.clientSocket.disconnect();
  }
}
