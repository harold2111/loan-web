import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable, throwError } from 'rxjs';
import { City } from '../model/city';
import { tap, catchError } from 'rxjs/operators';
import { Department } from '../model/department';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  private backendUrl = 'http://localhost:1323/api';

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.backendUrl + '/departments')
      .pipe(
        tap(() => this.log('fetched departments')),
        catchError(this.handleError('getDepartments', []))
      );
  }

  getCitiesByDepartmentID(departmentID: number): Observable<City[]> {
    const options = departmentID ? { params: new HttpParams().set('departmentID', String(departmentID)) } : {};
    return this.http.get<City[]>(this.backendUrl + '/cities', options)
      .pipe(
        tap(() => this.log('fetched cities')),
        catchError(this.handleError('getCitiesByDepartmentID', []))
      );
  }

  /**
* Handle Http operation that failed.
* Let the app continue.
* @param operation - name of the operation that failed
* @param result - optional value to return as the observable result
*/
  private handleError<T>(operation = 'operation', result?: T) {
    return (errorReponse: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(errorReponse); // log to console instead

      const errrorMessage = `${operation} failed: ${errorReponse.error.message}`;

      // TODO: better job of transforming error for user consumption
      this.log(errrorMessage);

      // Let the app keep running by returning an empty result.
      // return observableOf(result as T);
      return throwError(errrorMessage);
    };
  }

  /** Log a ClientService message with the MessageService */
  private log(message: string) {
    this.messageService.add('ClientService: ' + message);
  }
}
