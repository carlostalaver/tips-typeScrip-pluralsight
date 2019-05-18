import { Component } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { Capability } from 'protractor';
import { log } from 'util';
import { IToDo, TodosService } from './demo/todos.service';
import { ClaseDecorada } from './clasesDecorada';
import { ManejandoPromesas } from './promesas/doWorkPromise';

interface IBook {
  autor: string;
  editorial: string;
  anno: number;
}

interface IMagazine {
  direccion: string;
  director: string;
  anno: number;
}

const books: IBook[] = [
  {
    autor: 'carlos',
    editorial: 'rit',
    anno: 2019
  },
  {
    autor: 'Gabo',
    editorial: 'Ssanga',
    anno: 2019
  }
];

const revistas: IMagazine[] = [
  {
    anno: 2020,
    direccion: 'vitacura',
    director: 'director uno'
  },
  {
    anno: 2021,
    direccion: 'Las condes',
    director: 'Cart'
  }
];

const inter: IBook & IMagazine = {
  anno: 2019,
  autor: 'carlos',
  direccion: 'san martin',
  director: 'Cart',
  editorial: 'San gabriel'
};

// let testCarlos: 'Carlos' = 'Carlos';



function miFuncion(arg: IBook | IMagazine): void {
  console.log(arg);
}

function miFuncionDesestructurando( {anno, autor, direccion} = inter): void {
  console.log(`*********************************Sel año es ${anno} el autor ${autor} y direccion ${direccion} `);
}

interface Icart<K, V> {
  propiedad1: K;
  propiedad2: V;
}

const testInter: Icart<string, number> = {
  propiedad1: 'Hola cart',
  propiedad2: 28
};

//#region creando una tupla personaliza notas en la hoja 75 de la libreta
interface IkeyValuePais<K, V> extends Array<K | V> {
  0: K; // el CERO y el UNO son las propiedades con nombre numerico que usan las tuplas
  1: V;
}
const myTuplaPersonalizada: IkeyValuePais<string, number> = ['mi valor string', 21];
//#endregion

//#region  el polimorfico this, dependediendo de donde se llame a una funcion, this puede hacer referecia a una cosa u otra
class LibraryBook {

  arrayDeVariosTipos = ['hola', true, 21];

  Checkout(): this {
    console.log('Chequeando  OUT el libro', this);
    return this;
  }

  Checkin(): this {
    if (this instanceof ChildrenBook) {
      console.log('Checkin IN en CHILDRENSBOOK');
    }
    if (this instanceof ElectronicBook) {
      console.log('Checkin IN en ELECTRONICBOOK');
    }
    return this;
  }
}

class ChildrenBook extends LibraryBook {
  Clean(): this {
    console.log('Limpiando', this);
    return this;
  }
}

class ElectronicBook extends LibraryBook {
  RemoveFromCustomerDevice(): this {
    console.log('Removiendo libro del dispositivo', this);
    return this;
  }
}

/* const kidBook = new ChildrenBook();
kidBook.Checkin()
  .Clean()
  .Checkout();

const electronic = new ElectronicBook();
electronic.Checkin()
  .RemoveFromCustomerDevice()
  .Checkout(); */

//#endregion

/*
const interseccion: IBook & IMagazine = {...revistas[0], ...books[0]};
console.log(interseccion);
 */

//#region  usando guardias typeOf
function logVisitor(param: number | string) {

  if (typeof param === 'number') {
    console.log(`el paramentro ${param * 2} es un numero`);
  } else {
    console.log(`el paramentro ${param.toLocaleUpperCase()} es un string`);
  }
}
// logVisitor(21);
// logVisitor('Cart');
//#endregion

//#region Creando y usando type guard personalizados
function isBook(text: IBook | IMagazine): text is IBook {
  return (<IBook>text).autor !== undefined;
}

const permitido: IBook | IMagazine = revistas[0];

if (isBook(permitido)) {
  const v = <IBook>permitido;
  // console.log(' es un libro, autor ', v.autor);
} else {
  const v = <IMagazine>permitido;
  // console.log('es una revista, publicacion ', v.director);

}
//#endregion

//#region  trabajando con decoradores de clases

function sealed(elem1: string, elem2: number): Function {
  return function (target: Function): void {
    console.log(`Sellando el constructor ${elem1} ${elem2}`, target);
    Object.seal(target);
    Object.seal(target.prototype);
  };
}


function logger<TFunction extends Function>(target: TFunction): TFunction {
  const newContructor: Function = function () {
    console.log(`Creando nueva instancia`);
    console.log(target);
  };

  newContructor.prototype = Object.create(target.prototype);
  newContructor.prototype.constructor = target;
  console.log('--->', newContructor);
  return <TFunction>newContructor;
}
// @logger
// @sealed( 'cart', 21)
class Test {

  miMetodo = () => console.log('El metodo');

  miMetodo2 = () => console.log('El metodo2');

  otraFuncion(): void {
    console.log('segunda funcion');
  }
}

const objTest = new Test();
//#endregion



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'miproyecto';
  private nameAgeMapping: Map<string, number> = new Map();
  t4: Partial<IToDo[]> = [];

  key: IterableIterator<string>;

  constructor(private todo: TodosService) {
    this.nameAgeMapping.set('Lokesh', 37);
    this.nameAgeMapping.set('Raj', 35);
    this.nameAgeMapping.set('John', 40);


    this.upDateToDo(this.td); // le puedo pasar un obj de tipo IToDo
    this.upDatePartialToDo(this.td2); // o le puedo pasar un obj parcial de tipo IToDo
    this.recorrer();
    this.t4.push(this.td);

    this.operadorTresPuntos(this.t4);

    /* trabajando con decoradores, nota: la configuracion de los decoradores
    se aplica inmediatamente al instanciar la clase */
    const decoradores = new ClaseDecorada(21, 'Carlos Talavera');
    console.log('----> llamando a la clase decorada con el sealed ');
    // decoradores.assisFaculty(); esta llamada no es nacesaria para aplicar el decorador

    /* trabajando con asyncronia - promesas- async await */
     const miPromesa = new ManejandoPromesas();
  }

  td: IToDo = {
    title: 'El titulo',
    descriptions: ' esto es la descripcion',
    completed: true,
    date: new Date()
  };

  td2: Partial<IToDo> = {
    title: ' esto es titulo 2'
  };

  t3 = {
    valor1: {
      title: 'El titulo 1',
      descriptions: ' esto es la descripcion 1',
      completed: true,
      date: new Date()
    },
    valor2: {
      title: 'El titulo 2',
      descriptions: ' esto es la descripcion 2',
      completed: true,
      date: new Date()
    }
  };

  upDateToDo(todo: IToDo) { // tengo que pasarle un obj  completo de tipo IToDo
    this.todo.updateToDo(todo);
  }
  upDatePartialToDo(todo: Partial<IToDo>) { // puedo pasarle una parte del obj de tipo IToDo
    this.todo.updateToDo(todo);
  }

  recorrer(): void {
/*     this.nameAgeMapping.forEach((value, key, map) => {
      console.log('value: ', value);
      console.log('key: ', key);
      console.log('map: ', map);
    }); */
  }

  operadorTresPuntos(...t): void {
    console.log(' el parametro t ', t);
  }
}

