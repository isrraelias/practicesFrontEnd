import { Component, signal } from '@angular/core';
import {Counter} from '../../../shared/components/counter/counter'

@Component({
  selector: 'app-about',
  imports: [Counter],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {

  duration = signal<number>(1000);
  message = signal<string>('text');

  changeDuration(event: Event){
    const input = event.target as HTMLInputElement;
    //input.value siempre es de tipo string por eso hay que modificarlo
    this.duration.set(Number(input.value));
  }

  changeMessage(event: Event){
    const input = event.target as HTMLInputElement;
    //input.value siempre es de tipo string por eso hay que modificarlo
    this.message.set(input.value);
  }



}
