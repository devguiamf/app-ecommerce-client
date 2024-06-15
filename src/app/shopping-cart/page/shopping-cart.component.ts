import {Component, OnDestroy} from '@angular/core';
import {UserLoggeed} from "../../@shared/interfaces/user.interface";
import {LocalStorageService, StorageKeys} from "../../@shared/services/local-storage.service";
import {ShoppingCartService} from "../service/shopping-cart.service";
import {CartItem} from "../shopping-cart.interface";
import {Subject, takeUntil} from "rxjs";
import {Router} from "@angular/router";
import { Product, ProductsSimilar } from 'src/app/products/product.interface';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent implements OnDestroy{

  userLogged: UserLoggeed | null = null;
  cartItems: CartItem[] = [];
  itemSelected: CartItem[] = [];
  destroy$: Subject<void> = new Subject<void>();
  prodcutsRecomendation: Product[] = []
  loading = false;

  constructor(
    private localStorage: LocalStorageService,
    private shoppingCartService: ShoppingCartService,
    private router: Router
  ) {
    this.verifyUserLogged();
    this.getCartItems();
    this.getProductsRecomendation();
  }

  getProductsRecomendation(){  
    this.loading = true;  
    this.shoppingCartService.getProductsRecomendation(this.cartItems[0].productId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.prodcutsRecomendation = response.items
          this.loading = false;
        },
        error: () => {
          this.prodcutsRecomendation = []
          this.loading = false;
        },
      })
  }

  verifyUserLogged() {
    this.userLogged = this.localStorage.get(StorageKeys.user_logged_info);
  }

  get hasItemInCart() {
    this.cartItems = this.localStorage.get(StorageKeys.cart_items) ?? [];
    return this.cartItems.length > 0;
  }

  getCartItems(){
    this.cartItems = this.localStorage.get(StorageKeys.cart_items) ?? [];
  }

  removeItem(productId: string) {
    this.shoppingCartService.removeCartItemFromBehaviorList$(productId);
  }

  selectItemToBuy(item: CartItem) {
    if(!item.checked) {
      const itemIndex = this.itemSelected.findIndex(i => i.productId === item.productId);
      this.itemSelected.splice(itemIndex, 1);
      return;
    }

    this.itemSelected.push(item);
  }

  async buyItems(){
    if(this.itemSelected.length === 0) return alert('Selecione um item para continuar');
    await this.router.navigate(['/checkout'], {state: {data: this.itemSelected}});
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
