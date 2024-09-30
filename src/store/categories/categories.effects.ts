// src/store/categories/categories.effects.ts

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {exhaustMap, of} from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { DataService } from '../../app/core/services/data.service';
import { loadCategories, loadCategoriesSuccess, loadCategoriesFailed } from './categories.action';

@Injectable()
export class CategoriesEffects {
  constructor(private actions$: Actions, private dataService: DataService) {
  }

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCategories),
      exhaustMap(() =>
        this.dataService.getCategories().pipe(
          map(categories => {
            console.log('Categories loaded:', categories); // Лог успіху
            return loadCategoriesSuccess({categories});
          }),
          catchError(error => {
            console.error('Error loading categories:', error); // Лог помилки
            return of(loadCategoriesFailed({error}));
          })
        )
      )
    )
  );
}
