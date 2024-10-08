import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {exhaustMap, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {DataService} from '../../app/core/services/data.service';
import {
  loadCategories,
  loadCategoriesSuccess,
  loadCategoriesFailed,
  createCategory,
  addCategorySuccess, updateCategory, editCategorySuccess
} from './categories.action';


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
            return loadCategoriesSuccess({categories});
          }),
          catchError(error => {
            return of(loadCategoriesFailed({error}));
          })
        )
      )
    )
  );

  createCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createCategory),
      exhaustMap(({category}) =>
        this.dataService.addCategory(category).pipe(
          map((newCategory) => {
            return addCategorySuccess({category: newCategory});
          }),
        )
      )
    )
  );
  updateCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCategory),
      exhaustMap(({category, id}) =>
        this.dataService.updateCategory(category, id).pipe(
          map((newCategory) => {
            return editCategorySuccess({category: newCategory});
          }),
        )
      )
    )
  );
}
