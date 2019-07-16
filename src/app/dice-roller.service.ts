import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/*
  Handles random number calls and dice rolls for the app.
*/
export class DiceRollerService {

  // Simulate a d6 roll (psuedorandom)
  rollSix(): Observable<number> {
    return of(Math.floor((Math.random() * 6) + 1));
  }

  // Uses an argument to pull a psuedorandom integer from an arbitrarily wide range (1 to x)
  rollArb(x: number): Observable<number> {
    return of(Math.floor((Math.random() * x ) + 1));
  }

  // Simulates a coinflip (d2) with 0, 1 as possibilities
  coinFlip(): Observable<number> {
    return of(Math.floor((Math.random() * 2) + 1));
  }

  constructor() { }
}
