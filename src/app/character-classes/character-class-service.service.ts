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
