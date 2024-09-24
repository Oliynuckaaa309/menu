import { Routes } from '@angular/router';
import { CategoryComponent } from './menu/pages/category/category.component';
import { ProductsComponent } from './menu/pages/products/products.component';

export const routes: Routes = [
  { path: '', component: CategoryComponent },
  { path: 'category/:name', component: ProductsComponent },
];
