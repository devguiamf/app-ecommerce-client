import { Component } from '@angular/core';
import { ShopPage } from './shop/page/shop.page';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(){
    this.setLigthTheme()
  }

  setLigthTheme(){
    document.body.classList.toggle('dark', false);
  }
}
