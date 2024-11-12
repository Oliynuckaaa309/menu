import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from "@ngrx/store";
import { MaterialModule } from '../../../shared/material.module';
import { User } from '../../../shared/interface';
import { AuthService } from '../../../core/services/auth/auth.service';
import { AppState } from "../../../../store/store.index";
import { loginUser, registerUser } from "../../../../store/users/users.actions";
import { authError, registrationSuccess, selectedUserName } from "../../../../store/users/users.selectors";


@Component({
  selector: 'app-authorization',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.css'
})
export class AuthorizationComponent {
  isLoggedOut: boolean = false;
  errorForLogination!: string | null;
  errorForRegistration!: string | null;
  private snackBar = inject(MatSnackBar);
  usersForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.min(6)]],
  });

  authForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  })

  constructor(
    private dialogRef: MatDialogRef<AuthorizationComponent>,
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<AppState>
  ) {
  }

  loginUser() {
    this.isLoggedOut = true;
  }

  onSubmitUserLogIn() {
    const {email, password} = this.authForm.value;
    this.store.dispatch(loginUser({email, password}));
    this.store.select(authError)
      .subscribe(err => {
        if (err) {
          this.errorForLogination = 'Incorrect password or email. Please try again';
        }
      });
    this.store.select(selectedUserName).subscribe(user => {
        if (user) {
          this.authService.pushFirstNameEvent(user);
          this.dialogRef.close();
          this.snackBar.open('Login successful!', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      }
    )
  }

  closeWindow(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    let newUserChanges: User;
    const newUser = this.usersForm.value;
    newUserChanges = {
      isAdmin: false,
      ...newUser
    };

    if (this.usersForm.valid) {
      this.store.dispatch(registerUser({user: newUserChanges}));
    }

    this.store.select(registrationSuccess).subscribe(isAuthenticated => {
      if (isAuthenticated) {
        localStorage.setItem('currentUser', JSON.stringify(newUserChanges));
        this.authService.pushFirstNameEvent(this.usersForm.value);
        this.dialogRef.close();
        this.snackBar.open('You have successfully registered!', 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    });

    this.store.select(authError).subscribe(error => {
      if (error) {
        this.errorForRegistration = error;
      }
    });
  }

  linkToRegisterForm() {
    this.isLoggedOut = false;
  }
}
