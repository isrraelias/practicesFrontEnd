import { Component } from '@angular/core';

@Component({
  selector: 'app-labs',
  imports: [],
  templateUrl: './labs.html',
  styleUrl: './labs.css'
})
export class Labs {
  msg: string = 'hola mundo';
  tareas : Array<string> = ['tarea 1 - Ag', 'tarea 2 - Ag', 'tarea 3 - Ag'];
}
