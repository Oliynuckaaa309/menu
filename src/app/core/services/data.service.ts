import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, map, mergeMap, Observable, tap } from 'rxjs';
import { Category, Product, User } from '../../shared/interface';
import { apiKey } from '../../../enviroments/environment';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient) {}
  getCategories(): Observable<Category[]> {
    console.log("getCategories");
    return this.http.get<Category[]>(`${apiKey}/categories`);
  }
  getCategoryByName(name: string): Observable<Product[]> {
    console.log("getCategoryByName");
    return this.http.get<Product[]>(`${apiKey}/${name}`);
  }
  addProducts(dish: Product, category: string): Observable<Product> {
    console.log("addProducts");
    return this.http.post<Product>(`${apiKey}/${category}`, dish).pipe(
      tap(() => {
        this.loadProducts(dish.categoryName);
      }),
    );
  }
  addUser(user:User):Observable<User>{
    return this.http.post<User>(`${apiKey}/users`, user);
  }
  updateProduct(dish: Product): Observable<Product> {
    return this.http
      .put<Product>(`${apiKey}/${dish.categoryName}/${dish.id}`, dish)
      .pipe(
        tap(() => {
          this.loadProducts(dish.categoryName);
        }),
      );
  }
  getAllProducts(): Observable<Product[]> {
    return forkJoin({
      sets: this.http.get<Product[]>(`${apiKey}/sets`),
      rolls: this.http.get<Product[]>(`${apiKey}/rolls`),
      sauces: this.http.get<Product[]>(`${apiKey}/sauces`),
      drinks: this.http.get<Product[]>(`${apiKey}/drinks`)
    }).pipe(
      map(({ sets, rolls, sauces, drinks }) => {
        return [...sets, ...rolls, ...sauces, ...drinks];
      })
    );
  }


  loadProducts(category: string): void {
    this.http
      .get<Product[]>(`${apiKey}/${category}`)
      .subscribe((products) => {
        this.productsSubject.next(products);
      });
  }
}
