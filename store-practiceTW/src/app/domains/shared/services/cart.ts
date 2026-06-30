import { computed, Injectable, signal } from '@angular/core';
import { ProductList } from '../models/producList';

@Injectable({
  providedIn: 'root',
})
export class Cart {

  cart = signal<ProductList[]>([]);
  
  total = computed(()=>{
    const cart = this.cart();
    return cart.reduce((total, product) => total + product.price, 0)
  })

  addToCart(product: ProductList){
    this.cart.update( state => [...state,product])
  }
  
}
