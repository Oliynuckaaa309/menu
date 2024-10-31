import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { ContactFormComponent } from "./core/components/contact-form/contact-form.component";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent{
  title = 'menu';

  constructor(private dialog: MatDialog) {
  }

  openContactForm(): void {
    this.dialog.open(ContactFormComponent, {
      width: '500px',
      height: '500px',

    });
  }
}
