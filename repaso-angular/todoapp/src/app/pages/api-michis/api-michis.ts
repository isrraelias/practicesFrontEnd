import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-api-michis',
  imports: [],
  templateUrl: './api-michis.html',
  styleUrl: './api-michis.css'
})
export class ApiMichis {
  gatosphotos = signal<string[]>([]);
  favoriteGatosPhotos = signal<string[]>([]);
  msgError = '';
  msgErrorLoadFavorite = '';
  msgErrorSaveFavorite = '';

  url = 'https://api.thecatapi.com/v1/images/search';
  limitApi = 'limit=10';
  API_KEY = 'api_key=live_s10xsc5yPl9ChpsEGzT7bmBthnnXtgOy4w6HR5aXkXmwM3pxwLchBmPGFr9vlkxS';
  urlFav = 'https://api.thecatapi.com/v1/favourites';

  ngOnInit(){
    this.getRandomMichi();
    this.getFavoriteMichi();
  }

  //trae gatos aleatorios de la api
  async getRandomMichi() {
    try {
      const response = await fetch(this.url + '?' + this.limitApi + '&' + this.API_KEY);
      const data = await response.json();
      const urlsImages = data.map((data: any) => [data.url, data.id]);
      this.gatosphotos.set(urlsImages);
      console.log(data);
    } catch (error) {
      this.msgError = 'Error al obtener gatitos 😿 - '  + error;
    }
  }

  //guarda un gato como favorito
  async saveFavoriteMichi(id: string) {
    try {
      const rest = await fetch(this.urlFav, {
        method: 'POST',   
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.API_KEY
        },
        body: JSON.stringify({
          'image_id': 'trgTS8szc'
        })
      });
      const data = await rest.json();
      console.log(data); 
    } catch (error) {
      this.msgErrorSaveFavorite = 'Error al guardar gatito favorito 😿 - '  + error;
    }
  }

  //trae los gatos favoritos del usuario
  async getFavoriteMichi() {
    try {
      const response = await fetch(this.urlFav + '?' + this.API_KEY);
      const data = await response.json(); console.log('obtener fav',data);
      const urlsImages = data.map((data: any) => data.image.url);
      this.favoriteGatosPhotos.set(urlsImages); console.log(urlsImages);
    } catch (error) {
      this.msgErrorLoadFavorite = 'Error al obtener gatitos favoritos 😿 - '  + error;
    }
  }


}
