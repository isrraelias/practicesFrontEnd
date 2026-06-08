import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
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
  [  { id: 1, title: 'Learn Angular Signals', completed: true },
     { id: 2, title: 'Build a Todo App', completed: true }
  ]
  );

  initialTask = new FormControl('', { 
    nonNullable: true,
    validators: [
      Validators.required,
      noWhitespaceValidator
    ]
  });


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

}

