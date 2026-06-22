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
  itemsCart = signal<ProductList[]>([]);

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
        id: Date.now() + 1,
        title: 'producto 2',
        price: 90.99,
        image: 'https://picsum.photos/640/640?=12',
        creationDate: new Date().toISOString()
      },
       {
        id: Date.now() +2,
        title: 'producto 3',
        price: 55.80,
        image: 'https://picsum.photos/640/640?=20',
        creationDate: new Date().toISOString()

      },
      {
        id: Date.now() +3,
        title: 'producto 4',
        price: 90.99,
        image: 'https://picsum.photos/640/640?=33',
        creationDate: new Date().toISOString()
      },
       {
        id: Date.now() +4,
        title: 'producto 5',
        price: 55.80,
        image: 'https://picsum.photos/640/640?=50',
        creationDate: new Date().toISOString()

      },
      {
        id: Date.now() +5,
        title: 'producto 6',
        price: 90.99,
        image: 'https://picsum.photos/640/640?=54',
        creationDate: new Date().toISOString()
      },
    ]

    this.products.set(initProduct);

  }

  addToCart(product: ProductList){
    this.itemsCart.update( prevValue => [...prevValue, product])
  }

}
