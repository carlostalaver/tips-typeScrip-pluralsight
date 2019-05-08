import { async } from "@angular/core/testing";

const categorias = { cat1: ['El pricipito', 'GOT-2', 'Narnia'],
                     cat2: ['Harry Potter', 'La culpa es de la vaca', 'Lye'],
                     cat3: []};

function getBookByCategoria(cate: string): Promise<Array<string>> {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (categorias[cate] && categorias[cate].length > 0) {
          resolve(categorias[cate]);
        } else {
          reject(`No se encontraron libros para la categoria ${cate}`);
        }
      }, 2000);
  });

}

async function getBookByCategoriaAsyncAwait(cate: string): Promise<void> {
  try {
    const result = await getBookByCategoria(cate);
    console.log('---> los resultados son ', result);

  } catch (error) {
      console.log(' Ocurrio un error ', error);
  }
}

export class ManejandoPromesas {
  constructor() {
/*  usando promesas
 getBookByCategoria('cat3')
      .then( (ct) => {
          console.log('Las categorias son ', ct);
          return ct.length;
      })
      .then(numCategoria => console.log(`La cantidad de elementos son  ${numCategoria}`))
      .catch( err => console.log(err));
  */

  /* usando Async Await  */
  getBookByCategoriaAsyncAwait('cat3')
    .catch(err => console.log(err)); /* esto lo puedo hacer porque las funciones que usan ASYNC siempre retornan una promesa
    TAMBIEN PUDE HABER USADO UN TRY {} CASH() EN LA IMPLEMENTACION DEL METODO getBookByCategoriaAsyncAwait
    si uso catch encadenado a la llamdada al metodo no usu el try catch arriba */
}
}
