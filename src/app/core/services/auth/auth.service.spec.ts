import { fakeAsync, TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { LoginResponse, User } from "../../../shared/interface";
import { apiKey } from "../../../../enviroments/environment";

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ AuthService ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should push users first name', () => {
    const mockedUser: User = {
      firstName: 'Viktoria',
      lastName: 'Oliinyk',
      email: 'vik@example.com',
      password: '1234',
      isAdmin: false
    };
    service.pushFirstNameEvent(mockedUser);
    service.userName$.subscribe(name => {
      expect(name).toBe('Viktoria');
    });
  });

  it('should create user', () => {
    const mockedUser: User = {
      firstName: 'Viktoria',
      lastName: 'Oliinyk',
      email: 'vik@example.com',
      password: '1234',
      isAdmin: false
    };
    service.addUser(mockedUser).subscribe(user => {
      expect(user).toEqual(mockedUser);
    });
    const req = httpMock.expectOne(`${apiKey}/users`);
    expect(req.request.method).toBe('POST');
    req.flush(mockedUser);
  });

  it('should log out ', fakeAsync(() => {
    localStorage.setItem('token', 'test');
    localStorage.setItem('currentUser', JSON.stringify({firstName: 'Viktoria'}));
    service.userNameSubject.next('Viktoria');
    service.logOut();
    expect(service.userNameSubject.value).toBeNull();
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('currentUser')).toBeNull();
  }));

  it('should login user', () => {
    const mockedResponse: LoginResponse = {
      token: 'test',
      user: { firstName: 'Viktoria', lastName: 'Oliinyk', email: 'oll@example.com', password: '1234', isAdmin: false }
    };
    service.login('oll@example.com', '1234').subscribe(user => {
      expect(user).toEqual(mockedResponse);
      expect(localStorage.getItem('token')).toBe('test');
      expect(localStorage.getItem('currentUser')).toBe(JSON.stringify(mockedResponse.user));
      expect(service.userNameSubject.value).toBe('Viktoria');
    });
    const req = httpMock.expectOne(`${apiKey}/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockedResponse);
  });
});
