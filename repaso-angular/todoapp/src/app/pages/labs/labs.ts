import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-labs',
  imports: [CommonModule],
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

  buttonPrueba() {
    let button = document.querySelector('.button-prueba');
    let texto = document.createElement('p');
    texto.innerText = 'clickeaste el botón';
    console.log('click');
    if (button) {
      button.after(texto);
    }

  }

}
