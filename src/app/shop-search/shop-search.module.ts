import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopSearchRoutingModule } from './routes/shop-search-routing.module';
import { ShopSearchComponent } from './page/shop-search.component';
import {ShopSearchService} from "./service/shop-search.service";
import {PaginatorComponent} from "../@shared/components/paginator/paginator.component";
import {HeaderComponent} from "../fixed/header/header.component";
import { IonicModule } from '@ionic/angular';
import { ProductsPageModule } from '../products/products.module';


@NgModule({
  declarations: [
    ShopSearchComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ShopSearchRoutingModule,
    PaginatorComponent,
    HeaderComponent,
    ProductsPageModule
  ],
  providers: [
    ShopSearchService
  ]
})
export class ShopSearchModule { }
