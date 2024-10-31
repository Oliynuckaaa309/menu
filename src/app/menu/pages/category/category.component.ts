import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {Observable} from "rxjs";
import {Store} from '@ngrx/store';
import {MatIconButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {selectAllCategories} from '../../../../store/categories/categories.selector';
import {MaterialModule} from '../../../shared/material.module';
import {loadCategories} from "../../../../store/categories/categories.action";
import {Category} from "../../../shared/interface";
import {AppState} from "../../../../store/store.index";
import {CategoriesEditorComponent} from "../../dialogs/categoriesEditor/categories-editor/categories-editor.component";

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterModule, MatIconButton],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
  categories$!: Observable<Category[]>;
  isAdmin!: boolean;

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadCategories());
    this.categories$ = this.store.select(selectAllCategories);
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const parsedData = JSON.parse(userData);
      console.log(parsedData)
      this.isAdmin = parsedData.isAdmin;
    }
  }

  openModalWindow(action: string, item?: Category): void {
    const isEdit = action === 'edit';
    this.dialog.open(CategoriesEditorComponent, {
      width: '30%',
      minHeight: '50%',
      data: isEdit
        ? {item: item, isEdit: true}
        : {item: null, isEdit: false},
    });

  }
}
