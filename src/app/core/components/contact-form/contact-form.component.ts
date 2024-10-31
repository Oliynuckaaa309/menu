import { Component } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { CommonModule } from "@angular/common";
import { MaterialModule } from '../../../shared/material.module';
import { Message } from "../../../shared/interface";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [MaterialModule, CommonModule, FormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {
  public noPreviousMessages: boolean = true;
  public messages: Message[] = [];
  public message!: string;

  constructor(public dialogRef: MatDialogRef<ContactFormComponent>) {
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {

  }
}
