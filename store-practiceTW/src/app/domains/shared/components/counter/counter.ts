import { Component, Input, SimpleChanges } from '@angular/core';

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

  ngOnChanges(changes: SimpleChanges){
    //antes y durante el render
    console.log('ngOnchanges')
    console.log('---------'.repeat(10))
    console.log(changes);
    const capture = changes['duration']
    if(capture && capture.currentValue !== capture.previousValue){
      console.log(capture);
    }
    
  }

  ngOnInit(){
    //despues del render 
    //una sola vez
    //asyncrono - promesas, subcribe
    console.log('ngOnInit')
    console.log('---------'.repeat(10))
    console.log('duration -> ', this.duration)
    console.log('message -> ', this.message)
  }

  ngAfterViewInit(){
    //despues del render
    //pregunta si los hijos del componentes fueron renderizados
    console.log('ngAfterViewInit')
    console.log('---------'.repeat(10))
  }

  ngOnDestroy(){
    //se muestra cuando se destruye el componente
    console.log('ngOnDestroy')
    console.log('---------'.repeat(10))
  }

  concatenaEjemplo(){
    console.log('cambio algo')
  }


}
