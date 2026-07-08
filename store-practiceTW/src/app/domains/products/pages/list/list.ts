import { Component, inject, signal } from '@angular/core';
import { Product } from "../../components/product/product";
import { ProductList } from '@shared/models/producList'
import {Header} from '@shared/components/header/header'
import { Cart } from '@shared/services/cart';
import { ProductService } from '@shared/services/productService';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [Product,Header],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List {

  products = signal<ProductList[]>([]);
  //itemsCart = signal<ProductList[]>([]);
  private cartService = inject(Cart);
  private productService = inject(ProductService);

  ngOnInit(){
    this.productService.getProduct()
    .subscribe({
      next: (product) =>{
        this.products.set(product)
      },
      error: () =>{

      }
    })
  }

  constructor(){
    // el constructor ya no seria necesario por que la info la traemos de la api
   // this.products.set(initProduct);

  }

  addToCart(product: ProductList){
    //this.itemsCart.update( prevValue => [...prevValue, product])
    this.cartService.addToCart(product);
  }

}
