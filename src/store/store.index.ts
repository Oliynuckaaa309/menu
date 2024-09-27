import { ActionReducerMap } from '@ngrx/store';
import {CategoriesState, ProductsState} from '../app/shared/interface';
import { productsReducer } from './products/products.reducer';
import { categoriesReducer } from './categories/categories.reducer';
export interface AppState {
  products: ProductsState;
  categories: CategoriesState;

}

export const reducers: ActionReducerMap<AppState> = {
  products: productsReducer,
  categories: categoriesReducer,
};
