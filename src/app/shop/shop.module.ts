import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShopPageRoutingModule } from './routes/shop-routing.module';

import { ShopPage } from './page/shop.page';
import { ShopService } from './service/shop.service';
import { HeaderComponent } from '../fixed/header/header.component';
import { CarouselComponent } from '../fixed/carousel/carousel.component';
import { PaginatorComponent } from '../@shared/components/paginator/paginator.component';
import { ProductsPageModule } from '../products/products.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShopPageRoutingModule,
    HeaderComponent,
    CarouselComponent,
    PaginatorComponent,
    ProductsPageModule
  ],
  declarations: [ShopPage],
  providers: [
    ShopService
  ]
})
export class ShopPageModule {}
