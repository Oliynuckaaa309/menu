import {createReducer, on} from '@ngrx/store';
import {
  loadCategoriesSuccess,
  loadCategoriesFailed,
  createCategory,
  addCategorySuccess,
  editCategorySuccess
} from './categories.action';
import {CategoriesState} from '../../app/shared/interface';


export const initialState: CategoriesState = {
  categories: [],
  error: null,
};

export const categoriesReducer = createReducer(
  initialState,
  on(loadCategoriesSuccess, (state, {categories}) => ({
    ...state,
    categories: [...categories],
  })),

  on(loadCategoriesFailed, (state, {error}) => ({
    ...state,
    error,
  })),

  on(createCategory, (state, {}) => ({
      ...state,
      categories: [...state.categories]
    })
  ),

  on(addCategorySuccess, (state, {category}) => ({
    ...state,
    categories: [...state.categories, category]
  })),

  on(editCategorySuccess, (state, {category}) => ({
    ...state,
    categories: state.categories.map(p =>
      p.id === category.id ? category : p)
  })),
);
