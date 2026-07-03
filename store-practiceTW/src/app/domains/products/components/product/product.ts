import { Component, EventEmitter, inject, Input, Output, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductList} from '../../../shared/models/producList'
import {ProductService} from '../../../shared/services/productService'
import { TimeAgoPipe } from '@shared/pipes/time-ago-pipe';

@Component({
  selector: 'app-product',
  imports: [CommonModule,TimeAgoPipe],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
  //vamos a optimizar estos inputs
  // @Input( {required: true} ) titleImg: string = '';
  // @Input({required: true}) priceImg: number = 0.0;
  // @Input() pictureImg: string = '';
  @Input({required: true}) productInput!: ProductList;

  @Output() addToCartOutput = new EventEmitter();


  fechaPipe: Date = new Date(2026,6,3,10,30) // '2026-07-01'

  private productService = inject(ProductService);

  AddCartHandler(){
    this.addToCartOutput.emit(this.productInput);
    this.productService.getProduct();
  }

}
