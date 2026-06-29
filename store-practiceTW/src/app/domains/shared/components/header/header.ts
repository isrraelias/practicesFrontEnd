import { Component, signal, Input } from '@angular/core';
import {ProductList} from '../../models/producList'

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  hideSideMenu= signal(true);
  @Input() cart: ProductList[] = [];

  toogleSideMenu(){
    this.hideSideMenu.update((value) => !value)
  }

  updateNumberCart(){
    
  }

}
