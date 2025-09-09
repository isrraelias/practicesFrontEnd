import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('todoapp');
  msg: string = 'hola mundo';

  tareas : Array<string> = ['tarea 1 - Ag', 'tarea 2 - Ag', 'tarea 3 - Ag'];
}
