import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {
  WatchedMessageDirectiveDirective
} from "./components/contact-form/watchedMessageDirective/watched-message-directive.directive";

@NgModule({
  declarations: [],
  imports: [CommonModule, MaterialModule, HeaderComponent, FooterComponent, WatchedMessageDirectiveDirective],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
