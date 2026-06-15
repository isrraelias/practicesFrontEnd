import { Component, Input, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.css',
})
export class Counter {
  @Input({required: true}) duration = 0;
  @Input({required: true}) message = '';

  constructor(){
    //no puede ser async
    //antes del render
    console.log('constructor')
    console.log('---------'.repeat(10))
  }

  ngOnChanges(changes: SimpleChange){
    //antes y durante el render
    console.log('ngOnchanges')
    console.log('---------'.repeat(10))
    console.log(changes);
  }

}
