import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-api-michis',
  imports: [],
  templateUrl: './api-michis.html',
  styleUrl: './api-michis.css'
})
export class ApiMichis {
  gatosphotos = signal<string[]>([]);
  gatosphotosFavorite = signal<string[]>([]);
  url = 'https://api.thecatapi.com/v1/images/search?limit=10&api_key=live_s10xsc5yPl9ChpsEGzT7bmBthnnXtgOy4w6HR5aXkXmwM3pxwLchBmPGFr9vlkxS';
  urlFavorite = 'https://api.thecatapi.com/v1/favourites?api_key=live_s10xsc5yPl9ChpsEGzT7bmBthnnXtgOy4w6HR5aXkXmwM3pxwLchBmPGFr9vlkxS';

  ngOnInit(){
    this.getRandomMichi();
    this.getFavoriteMichi();
  }

  async getRandomMichi() {
    const response = await fetch(this.url);
    const data = await response.json();
    const urlsImages = data.map((data: any) => data.url);
    this.gatosphotos.set(urlsImages);
    console.log('data norm', data);
  }

  async getFavoriteMichi() {
    const response = await fetch(this.urlFavorite);
    const data = await response.json();
    const urlsImages = data.map((data: any) => data.image.url);
    this.gatosphotosFavorite.set(urlsImages);
    // console.log('data favo', data);
  }

  deleteFavoriteMichi() {
    console.log('Eliminar gatito'); 
  }


}
