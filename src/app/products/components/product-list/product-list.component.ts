import {Component, Input} from '@angular/core';
import {Product} from "../../product.interface";
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  @Input() productsItems!: Product[]

  constructor(
    private router: Router
  ){}

  async goToProductDetail(product: Product){
    await this.router.navigate(['/product', product.category.rootCategory.name, product.category.name, product.id])
  }
}
