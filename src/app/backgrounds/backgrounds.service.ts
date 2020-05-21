import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Background } from './background';
import { MessageService } from '../message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError, take } from 'rxjs/operators';
import { DiceRollerService } from '../dice-roller.service';

@Injectable({
  providedIn: 'root'
})
export class BackgroundsService {

  // HTTP connection information for Ruby on Rails (Puma) server at AWS Lightsail.
  // Specifies that this client expects JSON only, not HTML or XML.
  backgroundsURL = 'https://legionbackend.herokuapp.com/backgrounds';
  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json'
    })
  };

  // GETs Selected Feature by passing ID from FeatureDetailDisplay to server.
  getBackgroundById(id: number): Observable<Background>{
    this.log('Retrieving Specified Background, please wait');
    return this.httpClient.get<Background>(this.backgroundsURL + '/' + id, this.httpOptions)
      .pipe(
        tap(() => this.log('background retrieved'),
        catchError(this.handleError<Background>('getBackgroundById'))
        ));
  }

  // Grabs a randomly rolled background by ID. (2 is subject to change based on number of backgrounds in the DB)
  getRandomBackground(): Observable<Background> {
    let backgroundID;
    this.diceRoller.rollArb(4).pipe(take(1))
      .subscribe(backgroundRoll => backgroundID = backgroundRoll);
    return this.getBackgroundById(backgroundID);
  }

  // Shows messages using Message Service
  private log(message: string) {
    this.messageService.add(`Feature Service: ${message}`);
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
