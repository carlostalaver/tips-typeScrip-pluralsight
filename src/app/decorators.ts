// fabrica de funciones, no REEMPLAZA al constructor de la clase que decora
export function sealed( nameClase: string) {
  return function (target: Function): void { // void porq no quiero reemplazar el constructor de la clase a la decorará
    console.log(`Sealed the constructor ..::${nameClase}::..`, target);
    Object.seal(target),
    Object.seal(target.prototype);
  };
}


// este funcion REEMPLAZARÁ al constructor de CLase que decora

export function logger<TFunction extends Function>(target: TFunction): TFunction {
  const newConstructor: Function = () => {
    console.log(`Creando un nuevo constructor para la clase `);
    console.log(target);
  };
  newConstructor.prototype = Object.create(target.prototype);
  newConstructor.prototype.constructor = target;
  return newConstructor as TFunction;
}


// para trabajar con decoradores de metodos, esta funcion me permite asegurar que



export function readonly(isWritable: boolean): Function {
  return function ( target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log(`Establece el metodo ${propertyKey} para que sea solo lectura? : ${isWritable} `);
    descriptor.writable =  isWritable;
  }
}
