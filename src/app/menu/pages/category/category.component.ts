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
export class CategoryComponent implements OnInit{
   categories$!: Observable<Category[]>;
  constructor(
    private store: Store<AppState>
  ) {
  }
  ngOnInit(): void {
    this.store.dispatch(loadCategories());
    this.categories$ = this.store.select(selectAllCategories);
  }
  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
}
