import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

import { Task } from '../../models/task.model';


@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  taskList = signal<Task[]>(
  [  { id: 1, title: 'Learn Angular Signals', completed: false },
     { id: 2, title: 'Build a Todo App', completed: false }
  ]
  );
 
  showTasks(Event: Event) {
    return this.taskList();
  }

  changeList(event: Event){
    const element = event.target as HTMLInputElement;
    const newTask = element.value;
    this.addTask(newTask);
    // this.taskList.update((taskList) => {
    //  return [...taskList,newTask]
    // });
    element.value = '';
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

}

