import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {LocalStorageService, StorageKeys} from "../../@shared/services/local-storage.service";
import {CartItem} from "../shopping-cart.interface";
import { Product, ProductsSimilar } from 'src/app/products/product.interface';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  listCartItems$: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);
  headers: HttpHeaders

  constructor(
    private localStorageService: LocalStorageService,
    private http: HttpClient
  ) { 
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.localStorageService.get(StorageKeys.user_logged_info)?.token}`
    })
  }

  addCartItemToBehaviorList$(item: CartItem) {
    const currentValue = this.localStorageService.get(StorageKeys.cart_items) ?? [];
    const updatedValue = [...currentValue, item];
    this.listCartItems$.next(updatedValue);
    this.localStorageService.set(StorageKeys.cart_items, updatedValue);
  }

  addCartExistenceItemsToBehaviorList$(item: CartItem) {
    const updatedValue = this.listCartItems$.value.map(i => {
      if (i.productId === item.productId) {
        return {
          ...i,
          quantity: i.quantity + item.quantity
        }
      }
      return i;
    });
    this.listCartItems$.next(updatedValue);
    this.localStorageService.set(StorageKeys.cart_items, updatedValue);
    return;
  }

  verifyExistenceProductInCart(item: CartItem) {
    const currentValue = this.listCartItems$.value;
    const productExist = currentValue.find(i => i.productId === item.productId);
    if (productExist) {
      return productExist
    }
    return null;
  }

  removeCartItemFromBehaviorList$(productId: string) {
    const currentValue = this.localStorageService.get(StorageKeys.cart_items) ?? [];
    const updatedValue = currentValue.filter((item: any) => item.productId !== productId);
    this.listCartItems$.next(updatedValue);
    this.localStorageService.set(StorageKeys.cart_items, updatedValue);
  }

  getProductsRecomendation(idProduct: string): Observable<ProductsSimilar>{
    return this.http.get<ProductsSimilar>(`${environment.api}/showcase/products/${idProduct}/similar`, {
      headers: this.headers
    })
  }
}

