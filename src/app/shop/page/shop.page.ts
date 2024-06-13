import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { PageChange } from 'src/app/@shared/components/paginator/paginator.component';
import { UserLoggeed } from 'src/app/@shared/interfaces/user.interface';
import { LocalStorageService, StorageKeys } from 'src/app/@shared/services/local-storage.service';
import { Paginator } from 'src/app/@shared/util/pagination/paginator';
import { ProductPage } from 'src/app/products/product.interface';
import { ProductsService } from 'src/app/products/service/products.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage{

  destroy$: Subject<void> = new Subject<void>();
  userLogged: UserLoggeed | null = null;
  paginationsOptions: Paginator = new Paginator({page: 1, limit: 10})
  productPaginator: ProductPage = {page: 0, currentPage: 0, total: 0, items: []};
  
  constructor(
    private localStorage: LocalStorageService,
    private productService: ProductsService,
  ) { 
    this.searchProductsShowcase(),
    this.verifyUserLogged()
  }

  verifyUserLogged() {
    this.userLogged = this.localStorage.get(StorageKeys.user_logged_info);
  }

  searchProductsShowcase() {
    const query = this.paginationsOptions.toQueryString();
    this.productService.getProductsShowcaseHttp(query)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.productPaginator = response
      });
  }

  changePageProps(event: PageChange) {
    this.paginationsOptions.page = event.page;
    this.paginationsOptions.limit = event.limit;
    this.searchProductsShowcase();
  }


}
