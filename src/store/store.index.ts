import {ActionReducerMap} from '@ngrx/store';
import {CategoriesState, ProductsState, UserState} from '../app/shared/interface';
import {productsReducer} from './products/products.reducer';
import {categoriesReducer} from './categories/categories.reducer';
import {usersReducer} from "./users/users.reducer";

export interface AppState {
  products: ProductsState;
  categories: CategoriesState;
  users: UserState
}

export const reducers: ActionReducerMap<AppState> = {
  products: productsReducer,
  categories: categoriesReducer,
  users: usersReducer,
};
