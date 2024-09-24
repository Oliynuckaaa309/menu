import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, mergeMap, Observable, tap } from 'rxjs';
import { Category, Product } from '../../shared/interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:3000';
  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient) {}
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }
  getCategoryByName(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/${name}`);
  }
  addProducts(dish: Product, category: string): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/${category}`, dish).pipe(
      tap(() => {
        this.loadProducts(dish.categoryName);
      }),
    );
  }
  updateProduct(dish: Product): Observable<Product> {
    return this.http
      .put<Product>(`${this.apiUrl}/${dish.categoryName}/${dish.id}`, dish)
      .pipe(
        tap(() => {
          this.loadProducts(dish.categoryName);
        }),
      );
  }
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/sets`).pipe(
      mergeMap((sets) => {
        return this.http.get<Product[]>(`${this.apiUrl}/rolls`).pipe(
          mergeMap((rolls) => {
            return this.http.get<Product[]>(`${this.apiUrl}/sauces`).pipe(
              mergeMap((sauces) => {
                return this.http.get<Product[]>(`${this.apiUrl}/drinks`).pipe(
                  map((drinks) => {
                    return [...sets, ...rolls, ...sauces, ...drinks];
                  }),
                );
              }),
            );
          }),
        );
      }),
    );
  }

  loadProducts(category: string): void {
    this.http
      .get<Product[]>(`${this.apiUrl}/${category}`)
      .subscribe((products) => {
        this.productsSubject.next(products);
      });
  }
}
