import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, ErrorObserver, throwError, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { MessageService } from '../message.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterClassService {
  // TODO: Set up routing, controller, model on the server for this service.

  // HTTP connection information.
  classesURL = 'http://3.86.168.197:3000/classes';
  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json'
    })
  };

  // Shows messages using Message Service
  private log(message: string) {
    this.messageService.add(`Class Service: ${message}`);
  }

  // GETS a JSON object from the server.
  getClasses() {
  }

  // Takes a JSON object from Component and POSTs it to the server.
  postClass(characterClass): Observable<string> {
    const classString = JSON.stringify(characterClass);
    this.log('Submitting New Class, Please wait');
    return this.httpClient.post<string>(this.classesURL, classString, this.httpOptions)
      .pipe(
        tap((newClass: string) => this.log('added new class')),
        catchError(this.handleError<string>('postClass'))
      );
  }

  // Handles errors on HTTP requests
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  constructor(private httpClient: HttpClient, private messageService: MessageService) { }
}
