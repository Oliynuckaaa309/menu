import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../../../shared/material.module';
import { Store } from '@ngrx/store';
import { DataService } from '../../../core/services/data.service';
import { Product, User } from '../../../shared/interface';
import { DialogComponent } from '../../dialogs/dialog/dialog.component';
import { EditorComponent } from '../../dialogs/editor/editor.component';
import {selectAllProducts } from '../../../../store/products/products.selector';
import { loadProductsByCategory} from '../../../../store/products/products.actions';
import {Observable} from "rxjs";
import {MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, MaterialModule, MatIconButton],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  selectedCategoryName!: string;

  isAdmin!:boolean;
  products$!: Observable<Product[]>;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private dialog: MatDialog,
    private router: Router,
    private store: Store
  ) {

  }
  ngOnInit() {

    //  this.store.dispatch(loadProducts());
    // products=this.store.select(selectAllProducts).subscribe(products => {
    //   this.products=products
    // });
      this.route.params.subscribe((params) => {
      this.selectedCategoryName = params['name'];
      // this.store.dispatch(loadProductsByCategory({ categoryName: this.selectedCategoryName }));
        console.log('Action dispatched');
      this.products$= this.store.select(selectAllProducts);

       // this.dataService
       //  .getCategoryByName(this.selectedCategoryName)
       //   .pipe(take(1))
       //  .subscribe((data) => {
       //     this.products = data;
       //
       //   });
      // this.store.dispatch(loadProductsByCategory({ categoryName: this.selectedCategoryName }));
      // this.store.select(selectAllProducts).subscribe(products => {
      //   this.products = products;
      //
      // })
      // this.store.select(selectAllProducts).subscribe(state => {
      //   console.log(state)
      //   if (state) {
      //     if ("products" in state) {
      //       // this.products = state.products;
      //       console.log(this.products)
      //     }
      //   } else {
      //     console.log('Products are undefined');
      //   }
      // });



    });
    // this.dataService.products$.subscribe((products) => {
    //   this.products = products;
    // });


    const userObject = localStorage.getItem('currentUser');
    let userStatus: User;
    if (userObject) {
      userStatus = JSON.parse(userObject);
      this.isAdmin=userStatus.isAdmin
    }
  }
  openDialog(item: Product) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      height: '35%',
      data: item,
    });
  }
  onBack(): void {
    this.router.navigate(['']);
  }
  openModalWindow(action: string, item?: Product): void {
    const isEdit = action === 'edit';
     this.dialog.open(EditorComponent, {
      width: '35%',
      height: '50%',
      data: isEdit
        ? { item: item, isEdit: true }
        : { item: null, isEdit: false, selectedCategoryName: this.selectedCategoryName },
    });

  }
}
