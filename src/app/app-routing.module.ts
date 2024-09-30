import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CategoryComponent} from "./menu/pages/category/category.component";
import {ProductsComponent} from "./menu/pages/products/products.component";

const routes: Routes = [
  { path: '', component: CategoryComponent },
  { path: 'category/:name', component: ProductsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
