import {createAction, props} from '@ngrx/store';
import { Product } from '../../app/shared/interface';


export const loadProductsByCategory = createAction(
  '[Products] Load Products By Category',
  props<{ categoryName: string }>()
);
export const loadProductsSuccess = createAction('[Products] Load Products Success', props<{ products: Product[] }>());
export const loadProductsFailed = createAction('[Products] Load Products Failed', props<{error:string}>());
export const createProduct= createAction('[Products] Create Product', props<{product:FormData} >());
export const addProductSuccess = createAction(
  '[Products] Add Product Success',
  props<{ product: Product }>()
);
export const updateProduct=createAction('[Products] Update Product',props<{ product: FormData, id:number }>());
export const editProductSuccess=createAction('[Products] Edit Product', props<{product: Product}>())
export const loadAllProducts=createAction('[AllProducts] Load All Products]');
export const loadAllProductsSuccess=createAction('[Products]', props<{products: Product[]}>());
