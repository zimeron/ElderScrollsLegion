import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, ErrorObserver, throwError, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { MessageService } from '../message.service';
import { Feature } from '../Features/Feature';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {
  // HTTP connection information for Ruby on Rails (Puma) server at AWS Lightsail.
  // Specifies that this client expects JSON only, not HTML or XML.
  featuresURL = 'http://3.86.168.197:3000/features';
  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json'
    })
  };

  // Shows messages using Message Service
  private log(message: string) {
    this.messageService.add(`Feature Service: ${message}`);
  }

  // GETS all features currently in DB from the server for FeatureListDisplay
  getAllFeatures(): Observable<Feature[]> {
    this.log('Grabbing all Features, please wait');
    return this.httpClient.get<Feature[]>(this.featuresURL, this.httpOptions)
      .pipe(
        tap(() => this.log('features retrieved'),
        catchError(this.handleError<Feature[]>('getAllFeatures', []))
        ));
  }

  // GETs Selected Feature by passing ID from FeatureDetailDisplay to server.
  getFeatureById(id: number): Observable<Feature>{
    this.log('Retrieving Specified Feature, please wait');
    return this.httpClient.get<Feature>(this.featuresURL + '/' + id, this.httpOptions)
      .pipe(
        tap(() => this.log('feature retrieved'),
        catchError(this.handleError<Feature>('getFeatureById'))
        ));
  }


  // Takes a JSON object from FeatureDBInput and POSTs it to the server.
  postFeature(feature): Observable<string> {
    const featureString = JSON.stringify(feature);
    this.log('Submitting New Feature, Please wait');
    return this.httpClient.post<string>(this.featuresURL, featureString, this.httpOptions)
      .pipe(
        tap(() => this.log('added new feature')),
        catchError(this.handleError<string>('postFeature'))
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
