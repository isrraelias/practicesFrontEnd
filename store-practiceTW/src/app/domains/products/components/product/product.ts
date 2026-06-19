import { Component, EventEmitter, Input, Output} from '@angular/core';
import {ProductList} from '../../../shared/models/producList'

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
  //vamos a optimizar estos inputs
  // @Input( {required: true} ) titleImg: string = '';
  // @Input({required: true}) priceImg: number = 0.0;
  // @Input() pictureImg: string = '';
  @Input({required: true}) product!: ProductList;

  @Output() addToCart = new EventEmitter();

  AddCartHandler(){
    this.addToCart.emit('Mensaje emitido del hijo al padre');
  }

}
