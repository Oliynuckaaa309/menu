import { TestBed } from '@angular/core/testing';
import { ChatService } from './chat.service';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { MessageResponse, UserResponse } from "../../../shared/interface";
import { apiKey } from "../../../../enviroments/environment";


describe('ChatService', () => {
  let service: ChatService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ ChatService ]
    });
    service = TestBed.inject(ChatService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should give all users for support manager', () => {
    const mockedUsers: UserResponse[] = [
      {
        id: 1,
        firstName: 'Viktoria',
        lastName: 'Dsss',
        email: 'vv.doe@example.com',
        password: '123',
        isAdmin: false,
        createdAt: new Date('2023-11-11'),
        sender_id: 42,
        unread_count: 5,
      }
    ];
    service.getAllUsersForSupport().subscribe(users => {
      expect(users).toEqual(mockedUsers);
    })
    const req = httpMock.expectOne(`${apiKey}/chat/senders`);
    expect(req.request.method).toBe('GET');
    req.flush(mockedUsers);
  });

  it('should get the previous message', () => {
    const mockedId = 6;
    const mockedMessage: MessageResponse[] = [
      {
        id: 1,
        sender_id: 101,
        recipient_id: 201,
        message: 'Hello! I need help with my account.',
        createdAt: new Date('2023-11-01T10:15:00'),
        read_by_support: false
      }
    ];
    service.getPreviousMessage(mockedId).subscribe(messages => {
      expect(messages).toEqual(mockedMessage);
    })
    const req = httpMock.expectOne(`${apiKey}/chat/user/${mockedId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockedMessage);
  });
});
