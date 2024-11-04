import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from "rxjs";
import { Message, MessageResponse } from "../../../shared/interface";
@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  private clientSocket: Socket;

  constructor() {
    this.clientSocket = io('http://localhost:8080');
  }

  joinRoom(userId: number) {
    this.clientSocket.emit('joinRoom', {senderId: userId});
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

  disconnect() {
    this.clientSocket.disconnect();
  }
}
