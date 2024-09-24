import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CategoryComponent } from './pages/category/category.component';
import { ProductsComponent } from './pages/products/products.component';
import { DialogComponent } from './dialogs/dialog/dialog.component';
import { EditorComponent } from './dialogs/editor/editor.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    CategoryComponent,
    ProductsComponent,
    DialogComponent,
    EditorComponent,
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    CategoryComponent,
    ProductsComponent,
    DialogComponent,
    EditorComponent,
  ],
})
export class MenuModule {}
