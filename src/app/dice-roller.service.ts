import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiceRollerService {

  rollSix(): number {
    return(Math.floor((Math.random() * 6) + 1));
  }


  constructor() { }
}
