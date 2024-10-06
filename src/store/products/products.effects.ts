
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {exhaustMap, of} from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { DataService } from '../../app/core/services/data.service';
import {
  loadProductsByCategory,
  loadProductsSuccess,
  loadProductsFailed,
  createProduct,
  addProductSuccess,
  updateProduct, editProductSuccess,
  loadAllProducts, loadAllProductsSuccess
} from './products.actions';


@Injectable()
export class ProductsEffects {
  constructor(private actions$: Actions, private dataService: DataService) {
  }

  loadProductsByCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProductsByCategory),
      exhaustMap(({categoryName}) =>
        this.dataService.getCategoryByName(categoryName)
          .pipe(
            map(products => {
              console.log('Fetched products:', products); // Додайте цей лог
              return loadProductsSuccess({products});
            }),
            catchError(error => {
              console.error('Error fetching products:', error); // Додайте цей лог
              return of(loadProductsFailed({error}));
            })
          )
      )
    )
  );
  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createProduct),
      exhaustMap(({ product }) =>
        this.dataService.addProducts(product).pipe(
          map((newProduct) => {
            return addProductSuccess({ product: newProduct });
          }),
        )
      )
    )
  );
  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProduct),
      exhaustMap(({ product, id }) =>
        this.dataService.updateProduct(product, id).pipe(
          map((newProduct) => {
            return editProductSuccess({ product: newProduct });
          }),
        )
      )
    )
  );

  loadAllProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAllProducts),
      exhaustMap(( ) =>
        this.dataService.getAllProducts().pipe(
          map((products) => {
            return loadAllProductsSuccess({ products: products});
          }),
        )
      )
    )
  );


}

