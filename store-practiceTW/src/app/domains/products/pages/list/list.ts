import { Component, signal } from '@angular/core';
import { Product } from "../../components/product/product";
import { ProductList } from '../../../shared/models/producList'
import {Header} from '../../../shared/components/header/header'

@Component({
  selector: 'app-list',
  imports: [Product,Header],
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
        image: 'https://picsum.photos/640/640?=23',
        creationDate: new Date().toISOString()

      },
      {
        id: Date.now(),
        title: 'producto 2',
        price: 90.99,
        image: 'https://picsum.photos/640/640?=12',
        creationDate: new Date().toISOString()
      },
    ]

    this.products.set(initProduct);

  }

  listenToChild(Event: string){
    console.log('Mensaje recibido: ')
    console.log(Event)
  }

}
