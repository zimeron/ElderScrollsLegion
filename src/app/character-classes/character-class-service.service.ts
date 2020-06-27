import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, ErrorObserver, throwError, of } from 'rxjs';
import { tap, catchError, take } from 'rxjs/operators';
import { MessageService } from '../message.service';
import { characterClass } from './character-class';
import { DiceRollerService } from '../dice-roller.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterClassService {

  // HTTP connection information for Ruby on Rails (Puma) server at Heroku.
  // Specifies that this client expects JSON only, not HTML or XML.
  backgroundsURL = 'https://legionbackend.herokuapp.com/characterclasses';
  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json'
    })
  };

  // GETs Selected Class by passing ID to server.
  getClassById(id: number): Observable<characterClass>{
    this.log('Retrieving Specified Class, please wait');
    return this.httpClient.get<characterClass>(this.backgroundsURL + '/' + id, this.httpOptions)
      .pipe(
        tap(() => this.log('class retrieved'),
        catchError(this.handleError<characterClass>('getClassById'))
        ));
  }

  // Grabs a randomly rolled Class by ID. (2 is subject to change based on number of backgrounds in the DB)
  getRandomClass(): Observable<characterClass> {
    let classID;
    this.diceRoller.rollArb(2).pipe(take(1))
      .subscribe(classRoll => classID = classRoll);
    return this.getClassById(classID);
  }

  // Shows messages using Message Service
  private log(message: string) {
    this.messageService.add(`Class Service: ${message}`);
  }

  // Handles errors on HTTP requests
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  constructor(private messageService: MessageService, private httpClient: HttpClient, private diceRoller: DiceRollerService) { }

}
