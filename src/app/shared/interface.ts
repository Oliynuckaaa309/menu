export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface Product {
  id: number;
  name: string;
  weight: string;
  price: number;
  ingredients: string;
  image: string;
  categoryName: string;
}

export interface ProductModalWindowData {
  isEdit: boolean;
  selectedCategoryName?: string;
  item: Product;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface ProductsState {
  products: Product[];
  error: string | null;
}

export interface CategoriesState {
  categories: Category[],
  error: string | null;
}

export interface UserState {
  users: User[],
  error: string | null;
  currentUser: User | null;
  isAuthenticated: boolean;
}

export interface Message {
  data: Date;
  sender: string;
  message: string;
}

