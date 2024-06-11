import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { ShoppingCartRoutingModule } from './routes/shopping-cart-routing.module';
import { ShoppingCartComponent } from './page/shopping-cart.component';
import {ShoppingCartService} from "./service/shopping-cart.service";
import { ListCartItemsComponent } from './components/list-cart-items/list-cart-items.component';
import { CartItemComponent } from './components/list-cart-items/cart-item/cart-item.component';
import {HeaderComponent} from "../fixed/header/header.component";
import {MatChipTrailingIcon} from "@angular/material/chips";
import {MatIcon} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import { EmptyCartMessageComponent } from './components/empty-cart-message/empty-cart-message.component';


@NgModule({
  declarations: [
    ShoppingCartComponent,
    ListCartItemsComponent,
    CartItemComponent,
    EmptyCartMessageComponent
  ],
  imports: [
    CommonModule,
    ShoppingCartRoutingModule,
    HeaderComponent,
    NgOptimizedImage,
    MatChipTrailingIcon,
    MatIcon,
    FormsModule
  ],
  providers: [
    ShoppingCartService
  ]
})
export class ShoppingCartPageModule { }
