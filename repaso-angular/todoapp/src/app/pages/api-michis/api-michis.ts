import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

//definimos una interfase para facilitar el manejo de los datos que recibimos de la api
interface Michi {
  id: string;
  url: string;
}

@Component({
  selector: 'app-api-michis',
  imports: [FormsModule],
  templateUrl: './api-michis.html',
  styleUrl: './api-michis.css'
})
export class ApiMichis {
  gatosphotos = signal<Michi[]>([]);
  favoriteGatosPhotos = signal<Michi[]>([]);
  msgError = '';
  msgErrorLoadFavorite = '';
  msgErrorSaveFavorite = '';
  selectedFile: File | null = null;
  imagePreview: string | null = null;

  url = 'https://api.thecatapi.com/v1/images/search';
  limitApi = 'limit=8';
  API_KEY = 'live_s10xsc5yPl9ChpsEGzT7bmBthnnXtgOy4w6HR5aXkXmwM3pxwLchBmPGFr9vlkxS';
  urlFav = 'https://api.thecatapi.com/v1/favourites';
  urlUpload = 'https://api.thecatapi.com/v1/images/upload';

  ngOnInit(){
    this.getRandomMichi();
    this.getFavoriteMichi();
  }

  //trae gatos aleatorios de la api
  async getRandomMichi() {
    try {
      // const response = await fetch(this.url + '?' + this.limitApi + '&' + 'api_key=' +this.API_KEY);
      const response = await fetch(this.url + '?' + this.limitApi,{
        method: 'GET',
        headers:{
          'x-api-key': this.API_KEY,
        } 
      });
      const data = await response.json();
      const urlsImages: Michi[] = data.map((data: any) => ({
        id: data.id,
        url: data.url
      }));

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
          'image_id': id
        })
      });
      const data = await rest.json();
      console.log(data); 
      this.getFavoriteMichi();
    } catch (error) {
      this.msgErrorSaveFavorite = 'Error al guardar gatito favorito 😿 - '  + error;
    }
  }

  //trae los gatos favoritos del usuario
  async getFavoriteMichi() {
    try {
      // const response = await fetch(this.urlFav + '?' + 'api_key=' +this.API_KEY);
      const response = await fetch(this.urlFav,{
        method: 'GET',
        headers: {
          'x-api-key': this.API_KEY
        }
      });
      const data = await response.json(); console.log('obtener fav',data);

      const urlsImages : Michi[] = data.map((data: any) => ({
        id: data.id,
        url: data.image.url
      }));

      this.favoriteGatosPhotos.set(urlsImages); console.log(urlsImages);
    } catch (error) {
      this.msgErrorLoadFavorite = 'Error al obtener gatitos favoritos 😿 - '  + error;
    }
  }

  async deleteFavoriteMichi(id: string) {
    try{
      const rest = await fetch(`${this.urlFav}/${id}`,{
        method: 'DELETE',
        headers: {
          'Content-type': 'aplication/json',
          'x-api-key': this.API_KEY
        }
      });
      this.getFavoriteMichi();
    } catch (error) {

    }
  }

  onFileSelected(event: any) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];

      // Doble seguridad: validamos el tipo MIME por si arrastraron el archivo
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        this.selectedFile = file;

        // --- LA MAGIA DE LA PREVISUALIZACIÓN ---
        const reader = new FileReader();
        // Cuando termine de leer el archivo, asignamos el resultado al preview
        reader.onload = () => {
          this.imagePreview = reader.result as string; 
        };
        // Lee el archivo y lo transforma en una URL en base64
        reader.readAsDataURL(file);
        // ----------------------------------------

      } else {
        alert('Formato no permitido. Por favor sube solo JPG o PNG.');
        target.value = ''; // Reseteamos el input HTML
        this.selectedFile = null;
        this.imagePreview = null;
      }
    }
  }

  async uploadMichi(form: NgForm) {
    if(!this.selectedFile) {
      alert('Por favor, selecciona un archivo antes de subirlo.');
      return;
    }

    //1.creamos un objeto FormData para enviar el archivo al servidor
    const formData = new FormData();

    //2. Agregamos el archivo al FormData con la clave 'file'
    formData.append('file', this.selectedFile, this.selectedFile.name);

    // 3. ¡LA MAGIA! Recorremos todos los campos de texto del formulario 
    // y los agregamos al FormData automáticamente uno por uno.
    Object.keys(form.value).forEach(key => {
      formData.append(key, form.value[key]);
    });

    // En este punto, tu formData ya lleva: 'file', 'nombreMichi' y 'razaMichi'
    // sin que hayas tenido que escribirlos uno por uno.
    try{
      const res = await fetch(this.urlUpload,{
        method: 'POST',
        headers: {
          'x-api-key': this.API_KEY
        },
        body: formData
      });
      
      const data = await res.text();
      console.log(data); 
    }catch(error){
      console.error('Error al subir la imagen:', error);
    }

  }

}
