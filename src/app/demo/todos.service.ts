import { Injectable } from '@angular/core';

//#region nicoByte trabajando con partial types
export interface IToDo {
  title: string;
  descriptions: string;
  completed: boolean;
  date: Date;
}
//#endregion

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor() { }
  updateToDo(todo: Partial<IToDo>) {
    console.log('el obj td es ', todo);
  }
}
