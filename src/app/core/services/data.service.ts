import {  HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, Product } from '../../shared/interface';
import { apiKey } from '../../../enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`http://localhost:8080/categories`);
  }

  getCategoryByName(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${apiKey}/products?categoryName=${name}`);
  }

  addProducts(dish: FormData): Observable<Product> {
    return this.http.post<Product>(`${apiKey}/products`, dish);
  }

  updateProduct(dish: FormData, id: number): Observable<Product> {
    return this.http.put<Product>(`${apiKey}/products/${id}`, dish);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${apiKey}/products`);
  }

  addCategory(category: FormData): Observable<Category> {
    return this.http.post<Category>(`${apiKey}/categories`, category);
  }

  updateCategory(category: FormData, id: number): Observable<Category> {
    return this.http.put<Category>(`${apiKey}/categories/${id}`, category);
  }
}
