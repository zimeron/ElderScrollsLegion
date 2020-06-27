import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Birthsign } from './birthsign';
import { MessageService } from '../message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError, take } from 'rxjs/operators';
import { DiceRollerService } from '../dice-roller.service';

@Injectable({
  providedIn: 'root'
})
export class BirthsignService {
  // HTTP connection information for Ruby on Rails (Puma) server at Heroku.
  // Specifies that this client expects JSON only, not HTML or XML.
  racesURL = 'https://legionbackend.herokuapp.com/birthsigns';
  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json'
    })
  };

  // GETs Selected Birthsign by passing ID to server.
  getBirthsignById(id: number): Observable<Birthsign>{
    this.log('Retrieving Specified Birthsign, please wait');
    return this.httpClient.get<Birthsign>(this.racesURL + '/' + id, this.httpOptions)
      .pipe(
        tap(() => this.log('birthsign retrieved'),
        catchError(this.handleError<Birthsign>('getBirthsignById'))
        ));
  }

  // Grabs a randomly rolled Birthsign by ID. (5 is subject to change based on number of Races in the DB)
  getRandomBirthsign(): Observable<Birthsign> {
    let birthsignID;
    this.diceRoller.rollArb(7).pipe(take(1))
      .subscribe(birthsignRoll => birthsignID = birthsignRoll);
    return this.getBirthsignById(birthsignID);
  }

  // Shows messages using Message Service
  private log(message: string) {
    this.messageService.add(`Birthsign Service: ${message}`);
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
