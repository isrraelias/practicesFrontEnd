import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, Injector, signal } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

import { Task } from '../../models/task.model';

export function noWhitespaceValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if(value && value.trim().length === 0){
      return { whitespace: true };
    }
    return null;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  taskList = signal<Task[]>(
    JSON.parse(localStorage.getItem('tasksLs') || '[]')
  );

  initialTask = new FormControl('', { 
    nonNullable: true,
    validators: [
      Validators.required,
      noWhitespaceValidator
    ]
  });

  filterStatus = signal<'all'|'pending'|'completed'>('all');
  tasksFiltered = computed(() =>{
    const valueFilter = this.filterStatus();
    const tasks = this.taskList();

    switch(valueFilter){
      case 'completed':
        return tasks.filter((task) => task.completed);
      case 'pending':
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }

  })

// Se crea el effect fuera del constructor para tener un mejor control
// sobre el momento de inicialización del componente.
// Primero cargamos las tareas desde localStorage y después registramos
// el effect que sincroniza los cambios.
// Además, al crearlo desde ngOnInit usamos Injector para proporcionar
// el contexto de inyección que effect() necesita.
  // constructor() {
  //   effect(() =>{
  //     localStorage.setItem('tasksLs', JSON.stringify(this.taskList()))
  //   })
  // }
    
  injector = inject(Injector);

  //se puede omitir si desde el principio se inicializa con el valor de localStorage
  ngOnInit() {
    const storage = localStorage.getItem('tasksLs');
    if (storage) {
      const tasks = JSON.parse(storage);
      this.taskList.set(tasks);
    }
    this.trackTasks();
  }

  trackTasks() {
    effect(() => {
      const tasks = this.taskList();
      localStorage.setItem('tasksLs', JSON.stringify(tasks));
    }, { injector: this.injector });
  }


  showTasks(Event: Event) {
    return this.taskList();
  }

  changeList(){
  // changeList(event: Event){
    //Con el uso de FormControl, no es necesario obtener el valor del input a través del evento, ya que el FormControl se encarga de
    //  gestionar el estado del input y su valor. Por lo tanto, podemos acceder directamente al valor del FormControl para agregar 
    // una nueva tarea a la lista.
    // const element = event.target as HTMLInputElement;
    // const newTask = element.value;

    //Actuamos solo si esta validado
    if(this.initialTask.valid){
    const newTask = this.initialTask.value;
    this.addTask(newTask);
    this.initialTask.setValue('');
    }
    // this.taskList.update((taskList) => {
    //  return [...taskList,newTask]
    // });
  }

  addTask(newTaskTitle: string) {
    const newTask: Task = {
      id: this.taskList().length + 1,
      title: newTaskTitle,
      completed: false
    }
    this.taskList.update((currentTasks) => [...currentTasks, newTask]);
  }

  deleteTask(index: number){
    this.taskList.update((estadoAnt) => {
      return estadoAnt.filter((i) => i !== estadoAnt[index]);
    })
  }

  editTask(index: number){
    this.taskList.update((estadoAnt) =>{
      return estadoAnt.map((value, indice) =>{
        if(indice === index){
          return {...value, editing: true}
        }
        else 
          return {
            ...value, editing: false
          };
      })
    })
  }

  updateTaskStatus(index: number){
    this.taskList.update((estadoAnt) =>{
      return estadoAnt.map((value, indice) =>{
        if(indice === index){
          return {...value, completed: !value.completed}
        }
        else return value;
      })
    })
  }

  updateTaskTitle(index: number, event: Event){
    const input = event.target as HTMLInputElement;
    this.taskList.update((estadoAnt) =>{
      return estadoAnt.map((value, indice) =>{
        if(indice === index){
          return {...value, 
            title: input.value,
            editing: false
          }
        }
        else return value;
      })
    })
  }

  functionChangeFilter(newFilter: 'all' | 'pending' | 'completed'){    
    this.filterStatus.set(newFilter);
  }

}

