import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';


@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  taskList = signal([
    'Learn Angular'
    ,'Buy a unicorn' 
    , 'Make a dish']);

  showTasks(Event: Event) {
    return this.taskList();
  }

  changeList(event: Event){
    const element = event.target as HTMLInputElement;
    const newTask = element.value;
    this.taskList.update((taskList) => {
     return [...taskList,newTask]
    });
  }

  deleteTask(index: number){
    this.taskList.update((estadoAnt) => {
      return estadoAnt.filter((i) => i !== estadoAnt[index]);
    })
  }

}

