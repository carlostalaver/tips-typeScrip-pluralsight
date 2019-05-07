
import { sealed, logger, readonly } from './decorators';


// @sealed('ClaseDecorada')
@logger
export class ClaseDecorada {
  constructor(public para1: number, public param2: string) {

  }

  @readonly(true)
  assisFaculty() {
    console.log(`Metodo decorado `);

  }
}
