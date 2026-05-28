import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-api-michis',
  imports: [],
  templateUrl: './api-michis.html',
  styleUrl: './api-michis.css'
})
export class ApiMichis {
  gatosphotos = signal<string[]>([]);
  url = 'https://api.thecatapi.com/v1/images/search?limit=5&api_key=live_s10xsc5yPl9ChpsEGzT7bmBthnnXtgOy4w6HR5aXkXmwM3pxwLchBmPGFr9vlkxS';
  
  ngOnInit(){
    this.getRandomMichi();
  }

  async getRandomMichi() {
    const response = await fetch(this.url);
    const data = await response.json();
    const urlsImages = data.map((data: any) => data.url);
    this.gatosphotos.set(urlsImages);
  }

  getFavoriteMichi() {
    console.log('Obtener gatito');
  }

}
