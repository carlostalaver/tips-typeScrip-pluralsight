import { Component } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { Capability } from 'protractor';
import { log } from 'util';
import { IToDo, TodosService } from './demo/todos.service';

//#region
export class BasicCalculator {
  public constructor(protected value: number = 0) {
    console.log('llamando a constructor principal ', value );
   }
  public currentValue(): number {
    return this.value;
  }
  public add(operand: number): this {
    this.value += operand;
    return this;
  }
  public multiply(operand: number): this {
    this.value *= operand;
    return this;
  }
}

class ScientificCalculator extends BasicCalculator {
  public constructor(value = 21) {
     super(value);
  }
  public sin() {
    this.value = Math.sin(this.value);
    return this;
  }
}

export interface Person {
  name: string;
  age: number;
  location: {
    address: string,
    city: string
  };
  sexo: boolean;
}
export type K1 = keyof Person; // "name" | "age" | "location"
export type K2 = keyof Person[];  // "length" | "push" | "pop" | "concat" | ...
export type K3 = keyof { [x: string]: Person };  // string

function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map(n => o[n]);
}

function getProperty<T, K extends keyof T>(o: T, name: K): T[K]{
  return o[name]; // o[name] is of type T[K]
}
//#endregion


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

   private you: K1 = 'sexo';

  persona: Person = {
    age: 21,
    location: {
      address: 'San Martín',
      city: 'Chile'
    } ,
    name: 'Carlos',
    sexo: true
  };

  constructor(private todo: TodosService) {
     const result1 = pluck(this.persona, ['age', 'location']);
     const result2 = getProperty(this.persona, 'location');
    console.log(' Llamada a la funcion ', result2);
  }


  fixed(name: string = 'Hola'): string {
    let palabra: string;
    function postfix(epithet: string) {
      return palabra.charAt(0) + '.  the ' + epithet; // ok
    }
    palabra = name || 'Gabriel';
    return postfix('San');
  }

}
