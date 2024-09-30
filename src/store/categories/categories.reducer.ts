// src/store/categories/categories.reducer.ts

import { createReducer, on } from '@ngrx/store';
import { loadCategoriesSuccess, loadCategoriesFailed } from './categories.action';
import { CategoriesState} from '../../app/shared/interface';

export const initialState: CategoriesState = {
  categories: [],
  error: null,
};
export const scoreboardFeatureKey:string = 'categories';
export const categoriesReducer = createReducer(
  initialState,
  on(loadCategoriesSuccess, (state, { categories }) => ({
    ...state,
    categories,

  })),
  on(loadCategoriesFailed, (state, { error }) => ({
    ...state,
    error,
  }))
);
