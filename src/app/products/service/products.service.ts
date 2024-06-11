import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService, StorageKeys } from 'src/app/@shared/services/local-storage.service';
import { Product, ProductPage } from '../product.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  httpHeaders: HttpHeaders

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {
    this.httpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${this.localStorage.get(StorageKeys.user_logged_token)}`
    });
  }

  getProductDetailsHttp(id: string): Observable<Product>{
    return this.http.get<Product>(`${environment.api}/showcase/products/${id}`);
  }

  getProductsShowcaseHttp(query: string): Observable<ProductPage>{
    return this.http.get<ProductPage>(`${environment.api}/showcase/products${query}`);
  }
}
