// src/store/categories/categories.selectors.ts

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CategoriesState } from '../../app/shared/interface';

export const selectCategoriesState = createFeatureSelector<CategoriesState>('categories');

export const selectAllCategories = createSelector(
  selectCategoriesState,
  (state: CategoriesState) => state.categories
);
