import { Component, signal } from '@angular/core';
import { Product } from "../../components/product/product";
import { ProductList } from '../../../shared/models/producList'

@Component({
  selector: 'app-list',
  imports: [Product],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List {

  products = signal<ProductList[]>([]);

  constructor(){
    const initProduct: ProductList[] = [
      {
        id: Date.now(),
        title: 'producto 1',
        price: 55.80,
        image: 'https://picsum.photos/640/640?=23'
      },
      {
        id: Date.now(),
        title: 'producto 2',
        price: 90.99,
        image: 'https://picsum.photos/640/640?=12'
      },
    ]

    this.products.set(initProduct);

  }

  listenToChild(Event: string){
    console.log('Mensaje recibido: ')
    console.log(Event)
  }

}
