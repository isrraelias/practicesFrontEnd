import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  hideSideMenu= signal(true);

  toogleSideMenu(){
    this.hideSideMenu.update((value) => !value)
  }



}
