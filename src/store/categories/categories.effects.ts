// src/store/categories/categories.effects.ts

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { DataService } from '../../app/core/services/data.service';
import { loadCategories, loadCategoriesSuccess, loadCategoriesFailed } from './categories.action';

@Injectable()
export class CategoriesEffects {
  constructor(private actions$: Actions, private dataService: DataService) {}

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCategories),
      mergeMap(() =>
        this.dataService.getCategories().pipe(
          map(categories => loadCategoriesSuccess({ categories })),
          catchError(error => of(loadCategoriesFailed({ error })))
        )
      )
    )
  );
}
