import {createReducer, on} from '@ngrx/store';
import {
  loadProductsSuccess,
  loadProductsFailed,
  createProduct,
  addProductSuccess,
  editProductSuccess, loadAllProductsSuccess
} from './products.actions';
import {ProductsState} from '../../app/shared/interface';

export const initialState: ProductsState = {
  products: [],
  error: null
}
export const productsReducer = createReducer(
  initialState,
  on(loadProductsSuccess, (state, {products}) => ({
    ...state,
    products
  })),

  on(loadProductsFailed, (state, {error}) => ({
    ...state,
    error
  })),

  on(createProduct, (state, {}) => ({
      ...state,
      products: [...state.products]
    })
  ),

  on(addProductSuccess, (state, {product}) => ({
    ...state,
    products: [...state.products, product]
  })),

  on(editProductSuccess, (state, {product}) => ({
    ...state,
    products: state.products.map(p =>
      p.id === product.id ? product : p)
  })),

  on(loadAllProductsSuccess, (state, {products}) => ({
    ...state,
    products
  })),
);


