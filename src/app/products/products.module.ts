import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsPageRoutingModule } from './routes/products-routing.module';

import { ProductsPage } from './page/products.page';
import { ProductsService } from './service/products.service';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductItemCardComponent } from './components/product-list/product-item-card/product-item-card.component';
import { MatCardModule } from '@angular/material/card';
import { TruncatePipe } from '../@shared/pipes/truncate.pipe';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { HeaderComponent } from '../fixed/header/header.component';
import { MatIcon } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsPageRoutingModule,
    MatCardModule,
    TruncatePipe,
    CurrencyPipe, 
    NgOptimizedImage,
    HeaderComponent,
    MatIcon
  ],
  declarations: [
    ProductsPage,
    ProductListComponent,
    ProductItemCardComponent
  ],
  providers: [
    ProductsService
  ],
  exports: [
    ProductListComponent,
    ProductItemCardComponent
  ]
})
export class ProductsPageModule {}
