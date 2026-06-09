import { Component, signal, effect} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-labs',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.html',
  styleUrl: './labs.css'
})

export class Labs {
  msg: string = 'Prueba';
  tareas : Array<string> = ['tarea 1 - Ag', 'tarea 2 - Ag', 'tarea 3 - Ag'];
  codigo: string = 
  `<ul>
    @for(tarea of tareas; track tarea){
    <li>
      {{tarea}}
    </li>
    }
  </ul>`;
  estado: boolean = true;
  ejemploSignal = signal('');
  ejemploSwitch  = signal('');
  estadoCats = signal(false);
  colorCtrl = new FormControl();
  nombreCtrl = new FormControl('', { 
    nonNullable: true ,
    validators: [Validators.required, Validators.minLength(5)] 
  });
  //ejemploSignal = signal<string>; //otra forma de definir el tipo

  apiGatos = 'https://api.thecatapi.com/v1/images/search?limit=5&api_key=live_s10xsc5yPl9ChpsEGzT7bmBthnnXtgOy4w6HR5aXkXmwM3pxwLchBmPGFr9vlkxS';
  gatoEjemplo= signal<string[]>([]);

constructor() {
  this.colorCtrl.valueChanges.subscribe((color) => {
    console.log('Color seleccionado:', color);
  });
}

ngOnInit() {
  this.getGatito();
}

  buttonPrueba() {
    let button = document.querySelector('.button-prueba');
    let texto = document.createElement('p');
    texto.innerText = 'clickeaste el botón';
    console.log('click');
    if (button) {
      button.after(texto);
    }

  }

  onChange(event: Event){
    console.log(event);
  }

  changeInput(event: Event){
    const element = event.target as HTMLInputElement;
    this.ejemploSignal.set(element.value);
    console.log(this.ejemploSignal());
  }

  changeInputSwitch(event: Event){
    const element = event.target as HTMLInputElement;
    this.ejemploSwitch.set(element.value);
    console.log(this.ejemploSwitch());
  }

async getGatito(){
  try{ 
    const response = await fetch(this.apiGatos);
    const data = await response.json();
    const urls = data.map((gatito: any) => gatito.url);
    this.gatoEjemplo.set(urls);
    console.log(urls);
  }catch(error){
    console.error('Error al obtener el gatito:', error);
  }  
}

showCats(){
  this.estadoCats.update((estado) => !estado);  
}

}
