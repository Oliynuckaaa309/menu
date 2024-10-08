import {createAction, props} from '@ngrx/store';
import {Category} from '../../app/shared/interface';

export const loadCategories = createAction('[Categories] Load Categories');
export const loadCategoriesSuccess = createAction(
  '[Categories] Load Categories Success',
  props<{ categories: Category[] }>()
);
export const loadCategoriesFailed = createAction(
  '[Categories] Load Categories Failed',
  props<{ error: string }>()
);
export const createCategory = createAction('[Categories] Create Category', props<{ category: FormData }>());
export const addCategorySuccess = createAction(
  '[Categories] Add Category Success',
  props<{ category: Category }>()
);
export const updateCategory = createAction('[Categories] Update Category', props<{ category: FormData, id: number }>());
export const editCategorySuccess = createAction('[Categories] Edit Category', props<{ category: Category }>())
