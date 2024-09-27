import { createReducer, on } from '@ngrx/store';
import { loadProductsSuccess, loadProductsFailed} from './products.actions';
import {  ProductsState } from '../../app/shared/interface';



export const initialState: ProductsState = {
  products:[],
  error:null
}


export const productsReducer = createReducer(
  initialState,
  on(loadProductsSuccess, (state, { products }) => ({

    ...state,
    products
  })),
  on(loadProductsFailed, (state, { error }) => ({
    ...state,
    error
  }))
);


