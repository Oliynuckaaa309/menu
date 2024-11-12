import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthorizationComponent } from './authorization.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../../../shared/material.module';
import { of } from 'rxjs';
import { AuthService } from '../../../core/services/auth/auth.service';
import { AppState } from '../../../../store/store.index';
import { loginUser } from '../../../../store/users/users.actions';
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { User } from "../../../shared/interface";

describe('AuthorizationComponent', () => {
  let component: AuthorizationComponent;
  let fixture: ComponentFixture<AuthorizationComponent>;
  let mockStore: jasmine.SpyObj<Store<AppState>>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<AuthorizationComponent>>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    mockStore = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    mockAuthService = jasmine.createSpyObj('AuthService', ['pushFirstNameEvent']);

    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, MaterialModule, AuthorizationComponent, NoopAnimationsModule ],
      providers: [
        {provide: Store, useValue: mockStore},
        {provide: MatDialogRef, useValue: mockDialogRef},
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: MatSnackBar, useValue: mockSnackBar},
        {provide: AuthService, useValue: mockAuthService},
        FormBuilder,
      ]
    });

    fixture = TestBed.createComponent(AuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('loginUser', () => {
    it('should set isLoggedOut to true ', () => {
      component.loginUser();
      expect(component.isLoggedOut).toBeTrue();
    });
  });

  describe('onSubmitUserLogIn', () => {
    it('should dispatch loginUser and show success snackbar if login is successful', () => {
      const mockedUser: User = {
        firstName: 'Viktoria',
        lastName: 'Oliinyk',
        email: 'vik@example.com',
        password: '1234',
        isAdmin: false
      };
      const mockedUserForAuth = {
        email: 'vik@example.com',
        password: '1234',
      };
      component.authForm.setValue(mockedUserForAuth);
      mockStore.select.and.returnValue(of('testUser'));
      mockStore.dispatch.and.callThrough();
      component.onSubmitUserLogIn();
      expect(mockStore.dispatch).toHaveBeenCalledWith(loginUser(mockedUser));
      expect(mockAuthService.pushFirstNameEvent).toHaveBeenCalledWith(mockedUser);
      expect(mockDialogRef.close).toHaveBeenCalled();
      expect(mockSnackBar.open).toHaveBeenCalledWith('Login successful!', 'Close', jasmine.any(Object));
    });
  });


  describe('linkToRegisterForm', () => {
    it('should set isLoggedOut to false ', () => {
      component.linkToRegisterForm();
      expect(component.isLoggedOut).toBeFalse();
    });
  });
});

