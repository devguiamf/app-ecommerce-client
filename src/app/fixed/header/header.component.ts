import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { UserLoggeed } from 'src/app/@shared/interfaces/user.interface';
import { LocalStorageService, StorageKeys } from 'src/app/@shared/services/local-storage.service';
import { AccountMenuComponent } from '../account-menu/account-menu.component';
import { MatIcon } from '@angular/material/icon'
import { MatBadge } from '@angular/material/badge'
import { ShoppingCartService } from 'src/app/shopping-cart/service/shopping-cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonicModule,
    RouterLink,
    AccountMenuComponent,
    MatIcon,
    MatBadge
  ]
})
export class HeaderComponent {

  @Input({required: true}) userLogged: UserLoggeed | null = null;
  searchString: string = ''
  badge: string = '0'

  constructor(
    private localStorage: LocalStorageService,
    private shoppingCartService: ShoppingCartService,
    private router: Router
  ) {
    this.observeShoppingCart();
    this.getShoppingCartItems();
  }

  observeShoppingCart(){
    this.shoppingCartService.listCartItems$
      .subscribe({
        next: (cart) => {
          this.badge = cart.length.toString();
        }
      })
  };

  getShoppingCartItems(){
    this.badge = this.localStorage.get(StorageKeys.cart_items)?.length.toString() ?? '0';
  }

  async goToCart(){
    if(!this.userLogged){
      await this.router.navigate(['/login'], {queryParams: {from: this.router.url}});
      return;
    }
    await this.router.navigate(['/shopping-cart']);
  }

  async searchProduct(){
    console.log(this.searchString);
    
    if(this.searchString.length > 0){
      await this.router.navigate(['/shop-search'], {
        queryParams: {
          product: this.searchString,
          name: this.searchString
        }
      });
      return;
    }
  
    await this.router.navigate(['/shop-search']);
  }

}
