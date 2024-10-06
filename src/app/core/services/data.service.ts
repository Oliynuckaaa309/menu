import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, map, mergeMap, Observable, tap } from 'rxjs';
import { Category, Product, User } from '../../shared/interface';
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
  updateProduct(dish: FormData,  id: number): Observable<Product> {
    return this.http.put<Product>(`${apiKey}/products/${id}`, dish);
  }
  // addUser(user:User):Observable<User>{
  //   return this.http.post<User>(`${apiKey}/users`, user);
  // }
  getAllProducts(): Observable<Product[]> {
      return this.http.get<Product[]>(`${apiKey}/products`);
    }
}
