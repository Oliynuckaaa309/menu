// src/store/products/products.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {exhaustMap, of} from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { DataService } from '../../app/core/services/data.service';
import { loadProductsByCategory, loadProductsSuccess, loadProductsFailed } from './products.actions';


@Injectable()
export class ProductsEffects {
  constructor(private actions$: Actions, private dataService: DataService) {}

  loadProductsByCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProductsByCategory),
      exhaustMap(({ categoryName }) =>
        this.dataService.getCategoryByName(categoryName)
          .pipe(
            map(products => {
              console.log('Fetched products:', products); // Додайте цей лог
              return loadProductsSuccess({ products });
            }),
            catchError(error => {
              console.error('Error fetching products:', error); // Додайте цей лог
              return of(loadProductsFailed({ error }));
            })
        )
      )
    )
  );
}

