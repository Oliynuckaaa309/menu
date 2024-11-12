import { TestBed } from '@angular/core/testing';
import { SocketIoService } from './socket-io.service';
import {  Socket } from 'socket.io-client';
import { Message } from "../../../shared/interface";

class MockSocket {
  emit = jasmine.createSpy('emit');
  on = jasmine.createSpy('on');
  disconnect = jasmine.createSpy('disconnect');
}


describe('SocketIoService', () => {
  let service: SocketIoService;
  let mockSocket: MockSocket;

  beforeEach(() => {
    mockSocket = new MockSocket();
    TestBed.configureTestingModule({
      providers: [
        SocketIoService,
        { provide: Socket, useValue: mockSocket }
      ]
    });
    service = TestBed.inject(SocketIoService);
    service['clientSocket'] = mockSocket as unknown as Socket;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should join room', () => {
    const roomId=11;
    service.joinRoom(roomId);
    expect(mockSocket.emit).toHaveBeenCalledWith('joinRoom', {roomId: roomId});
  });

  it('should send message', () => {
    const mockedMessage: Message= {senderId:2, recipientId:3, message:'Hello'};
    service.sendMessage(mockedMessage);
    expect(mockSocket.emit).toHaveBeenCalledWith('SendMessage', mockedMessage);
  });

  it('should mark message ', () => {
    const mockedId=3;
    service.markMessageAsRead(mockedId);
    expect(mockSocket.emit).toHaveBeenCalledWith('WatchedMessage', {id: mockedId});
  });

  it('should disconnect ', () => {
    service.disconnect()
    expect(mockSocket.disconnect).toHaveBeenCalledWith();
  });
});
