import {createAction, props} from '@ngrx/store';
import { Product } from '../../app/shared/interface';


export const loadProductsByCategory = createAction(
  '[Products] Load Products By Category',
  props<{ categoryName: string }>()
);
export const loadProductsSuccess = createAction('[Products] Load Products Success', props<{ products: Product[] }>());
export const loadProductsFailed = createAction('[Products] Load Products Failed', props<{error:string}>());
