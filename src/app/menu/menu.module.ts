import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CategoryComponent } from './pages/category/category.component';
import { ProductsComponent } from './pages/products/products.component';
import { DialogComponent } from './dialogs/dialog/dialog.component';
import { EditorComponent } from './dialogs/editor/editor.component';
import {StoreModule} from "@ngrx/store";
import {productsReducer} from "../../store/products/products.reducer";
import {categoriesReducer} from "../../store/categories/categories.reducer";
import {EffectsModule} from "@ngrx/effects";
import {CategoriesEffects} from "../../store/categories/categories.effects";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    CategoryComponent,
    ProductsComponent,
    DialogComponent,
    EditorComponent,
    StoreModule.forRoot({products: productsReducer, categories: categoriesReducer}),
    EffectsModule.forRoot([CategoriesEffects])],
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
