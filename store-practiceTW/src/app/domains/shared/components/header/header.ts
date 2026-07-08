import { Component, signal, Input, SimpleChanges, inject } from '@angular/core';
import {ProductList} from '../../models/producList'
import { Cart } from '../../services/cart';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  hideSideMenu= signal(true);
  //quitamos input para usar el servicio
  //@Input() cart: ProductList[] = [];
  //totalPrice = signal(0);
  //lo hace privado para que no se renderice al componente
  private cartService = inject(Cart)
  cart = this.cartService.cart;
  total = this.cartService.total;


  toogleSideMenu(){
    this.hideSideMenu.update((value) => !value)
  }

  /*
  ngOnChanges(changes: SimpleChanges){
    const total = changes['cart'];
    if(total){
      this.totalPrice.set(this.totalCart());
    }
  }


  totalCart(){
    return this.cart.reduce((previusValue, value) => previusValue + value.price, 0)
  }
*/

}
