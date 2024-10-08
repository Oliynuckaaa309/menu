import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {Store} from '@ngrx/store';
import {Observable} from "rxjs";
import {MatIconButton} from "@angular/material/button";
import {MatDialog} from '@angular/material/dialog';
import {MaterialModule} from '../../../shared/material.module';
import {Product,} from '../../../shared/interface';
import {DialogComponent} from '../../dialogs/dialog/dialog.component';
import {EditorComponent} from '../../dialogs/editor/editor.component';
import {selectAllProducts} from '../../../../store/products/products.selector';
import {loadProductsByCategory} from '../../../../store/products/products.actions';
import {AppState} from "../../../../store/store.index";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, MaterialModule, MatIconButton],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  selectedCategoryName!: string;
  isAdmin!: boolean | undefined;
  products$!: Observable<Product[]>;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.selectedCategoryName = params['name'];
      this.store.dispatch(loadProductsByCategory({categoryName: this.selectedCategoryName}));
      this.products$ = this.store.select(selectAllProducts);

    });
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const parsedData = JSON.parse(userData);
      this.isAdmin = parsedData.isadmin;
    }
  }

  openDialog(item: Product) {
    this.dialog.open(DialogComponent, {
      minWidth: '30%',
      minHeight: '35%',
      data: item,
    });
  }

  onBack(): void {
    this.router.navigate(['']);
  }

  openModalWindow(action: string, item?: Product): void {
    const isEdit = action === 'edit';
    this.dialog.open(EditorComponent, {
      width: '50%',
      minHeight: '50%',
      data: isEdit
        ? {item: item, isEdit: true}
        : {item: null, isEdit: false, selectedCategoryName: this.selectedCategoryName},
    });

  }
}
