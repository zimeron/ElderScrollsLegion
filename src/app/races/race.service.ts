import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { characterRace } from './characterRace';
import { take, tap, catchError } from 'rxjs/operators';
import { MessageService } from '../message.service';
import { DiceRollerService } from '../dice-roller.service';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
// HTTP connection information for Ruby on Rails (Puma) server at AWS Lightsail.
  // Specifies that this client expects JSON only, not HTML or XML.
  racesURL = 'https://legionbackend.herokuapp.com/races';
  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json'
    })
  };

  // GETs Selected Background by passing ID from FeatureDetailDisplay to server.
  getRaceById(id: number): Observable<characterRace>{
    this.log('Retrieving Specified Race, please wait');
    return this.httpClient.get<characterRace>(this.racesURL + '/' + id, this.httpOptions)
      .pipe(
        tap(() => this.log('race retrieved'),
        catchError(this.handleError<characterRace>('getRaceById'))
        ));
  }

  // Grabs a randomly rolled Race by ID. (5 is subject to change based on number of Races in the DB)
  getRandomRace(): Observable<characterRace> {
    let raceID;
    this.diceRoller.rollArb(7).pipe(take(1))
      .subscribe(raceRoll => raceID = raceRoll);
    return this.getRaceById(raceID);
  }

  // Shows messages using Message Service
  private log(message: string) {
    this.messageService.add(`Race Service: ${message}`);
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
