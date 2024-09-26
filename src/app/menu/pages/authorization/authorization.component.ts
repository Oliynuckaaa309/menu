import { Component, inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MaterialModule } from '../../../shared/material.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../core/services/data.service';
import { take } from 'rxjs';
import { AuthService } from '../../../core/services/auth/auth.service';
import { User } from '../../../shared/interface';

@Component({
  selector: 'app-authorization',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule,  CommonModule],
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.css'
})
export class AuthorizationComponent implements OnInit {
  isLoggedOut: boolean = false; 
  private snackBar = inject(MatSnackBar);
  public errorMessage!:string;
  usersForm:FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', [Validators.required, Validators.min(1)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
   
   });
   authForm:FormGroup=this.fb.group({
    email:['', [Validators.required, Validators.email]],
    password:['', Validators.required],
   })
  constructor(private dialogRef: MatDialogRef<AuthorizationComponent>, 
  private fb: FormBuilder,
  private dataService:DataService,
private authService:AuthService){}
ngOnInit(): void {
  
}


loginUser(){
  this.isLoggedOut=true;
}
onSubmitUserLogIn() {
  const { email, password } = this.authForm.value;
  this.authService.login(email, password).subscribe(
    data => {
      localStorage.setItem('currentUser', JSON.stringify(data.user));
      this.authService.registerUser(data.user);
      if (data.success) {
        this.snackBar.open('Login successful!', 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.dialogRef.close();
      }
    },
    error => {
      this.errorMessage = 'Invalid email or password';
    }
  );

}


  onSubmit(){
   let newUserChanges:User;
    const newUser=this.usersForm.value;
    newUserChanges={
      isAdmin:false,
      ...newUser
    }
    this.dataService.addUser(newUserChanges).pipe(take(1)).subscribe(response=>{
      localStorage.setItem('currentUser', JSON.stringify(response));
    });
   
    this.dialogRef.close();
    this.snackBar.open('You have successfully logged in!', 'Close', {
    duration: 5000,
    horizontalPosition: 'center', 
    verticalPosition: 'top', 
});
this.authService.registerUser(this.usersForm.value);

  }
  linkToRegisterForm(){
    this.isLoggedOut=false;
  }
  closeWindow():void{
  this.dialogRef.close();
  }

}
