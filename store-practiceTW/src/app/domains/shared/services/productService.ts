import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductList } from '../models/producList';


@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private http = inject(HttpClient);
  
  getProduct(){
    return this.http.get<ProductList[]>('https://fakestoreapi.com/products')
    //const product = await fetch('https://fakestoreapi.com/products');
    //const product = await fetch('https://api.escuelajs.co/api/v1/products');
    // const data: ProductList = await product.json();

    // console.log(data);

    // return data;
  }
  
}
