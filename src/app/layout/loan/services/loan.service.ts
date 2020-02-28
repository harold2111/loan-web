import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MessageService } from '../../shared/services/message.service';
import { Loan } from '../models/loan';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { LoanWithAmortizations } from '../models/loan_with_amortizations';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  private backendUrl = 'http://localhost:1323/api';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(this.backendUrl + '/loans')
      .pipe(
        tap(() => this.log('fetched loans')),
        catchError(this.handleError('getLoans', []))
      );
  }

  simulateLoan(loan: Loan): Observable<LoanWithAmortizations> {
    return this.http.post<LoanWithAmortizations>(this.backendUrl + '/loans/simulate', loan)
      .pipe(
        tap(createClientResponse => this.log('fetched simulate loans')),
        catchError(this.handleError('simulateLoan', new LoanWithAmortizations()))
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
  // this.messageService.add('ClientService: ' + message);
  console.log('LoanService: ' + message);
}
}
