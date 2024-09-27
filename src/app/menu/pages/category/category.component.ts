import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../shared/material.module';
import {selectAllCategories } from '../../../../store/categories/categories.selector';
import {select, Store} from '@ngrx/store';
import {loadCategories} from "../../../../store/categories/categories.action";
import {Category, Product} from "../../../shared/interface";
import {Observable} from "rxjs";
import {AppState} from "../../../../store/store.index";

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent  {
   categories$!: Observable<Category[]>;


  constructor(
    private store: Store<{categories: Category[]}>
  ) {
     // this.store.dispatch(loadCategories());
    // this.store.select().subscribe(test => console.log(test));
    // this.store.pipe(select(selectAllCategories)).subscribe(test => console.log(test));
    this.store.dispatch(loadCategories());
     //this.store(select(selectAllCategories)).subscribe(test => console.log(test));
    // this.store.dispatch(loadCategories());

    // this.categories$ = this.store.pipe(select(categorySelector));
    // this.isLoading$ = this.store.pipe(select(isLoadingSelector));
     // this.categories$= this.store.select('categories'));
  }


  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
}
