import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from '../../app/shared/interface';

export const featureKey = 'products';

export const selectProductsState = createFeatureSelector<ProductsState>(featureKey);
export const selectAllProducts = createSelector(
  selectProductsState,
  (state: ProductsState) =>state.products);
