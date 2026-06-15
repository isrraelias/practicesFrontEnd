import { Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
  @Input( {required: true} ) titleImg: string = '';
  @Input({required: true}) priceImg: number = 0.0;
  @Input() pictureImg: string = '';

  @Output() addToCart = new EventEmitter();

  AddCartHandler(){
    this.addToCart.emit('Mensaje emitido del hijo al padre');
  }

}
