// src/store/categories/categories.actions.ts

import { createAction, props } from '@ngrx/store';
import { Category } from '../../app/shared/interface';

export const loadCategories = createAction('[Categories] Load Categories');
export const loadCategoriesSuccess = createAction(
  '[Categories] Load Categories Success',
  props<{ categories: Category[] }>()
);
export const loadCategoriesFailed = createAction(
  '[Categories] Load Categories Failed',
  props<{ error: string }>()
);
