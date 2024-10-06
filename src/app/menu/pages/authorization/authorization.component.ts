import {Component, inject, OnInit,} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MaterialModule} from '../../../shared/material.module';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../shared/interface';
import {Store} from "@ngrx/store";
import {AuthService} from '../../../core/services/auth/auth.service';
import {AppState} from "../../../../store/store.index";
import {loginUser, loginUserSuccess, registerUser} from "../../../../store/users/users.actions";
import {selectedUserName, } from "../../../../store/users/users.selectors";
import {takeUntil} from "rxjs";

@Component({
  selector: 'app-authorization',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.css'
})
export class AuthorizationComponent {
  isLoggedOut: boolean = false;
  isClickAddButton !:boolean;
  private snackBar = inject(MatSnackBar);
  public errorMessage!: string;
  usersForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', [Validators.required, Validators.min(1)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],

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
  ) {}
  loginUser() {
    this.isLoggedOut = true;
  }


  onSubmitUserLogIn() {
    const {email, password} = this.authForm.value;
    this.store.dispatch(loginUser({email, password}))

    // this.dialogRef.close();
    // this.snackBar.open('Login successful!', 'Close', {
    //   duration: 5000,
    //   horizontalPosition: 'center',
    //   verticalPosition: 'top',
    // });

      //     const user = localStorage.getItem('currentUser');
      //     if (user) {
      //       const currentUser = JSON.parse(user);
      //        this.userName = currentUser.firstName;
      //       console.log(currentUser.firstName);
      //     }
   this.store.select(selectedUserName).subscribe(user=>{
     if(user){
         this.authService.registerUser(user as User);
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
  onSubmit1(){
    this.isClickAddButton=true;
  }
  onSubmit() {
    let newUserChanges: User;
    const newUser = this.usersForm.value;
    newUserChanges = {
      isAdmin: false,
      ...newUser
    }
    if(this.usersForm.valid){
      this.store.dispatch(registerUser({user:newUserChanges}));
      localStorage.setItem('currentUser', JSON.stringify(newUserChanges));
      this.dialogRef.close();
      this.snackBar.open('You have successfully registered!', 'Close', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
     this.authService.registerUser(this.usersForm.value);

  }

  linkToRegisterForm() {
    this.isLoggedOut = false;
  }
}
