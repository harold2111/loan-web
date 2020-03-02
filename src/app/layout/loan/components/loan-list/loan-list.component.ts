import { Component, ViewChild, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { merge, of as observableOf} from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { LoanService } from '../../services/loan.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Loan } from '../../models/loan';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoanListComponent implements AfterViewInit {

  title = 'Creditos';

  displayedColumns = ['id', 'principal', 'interestRatePeriod', 'periodNumbers', 'paymentAgreed', 'status', 'options'];
  data: Loan[] = [];

  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loanService: LoanService
  ) { }

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.loanService.getLoans();
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.resultsLength = data.length;
          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);
  }

  onCreate(): void {
    this.router.navigate(['/loan//loan-form']);
  }

  onEdit(id: number): void {
    this.router.navigate(['/loan/loand/loan-form', id]);
  }

  applyFilter(filterValue: string) {
    // TODO: implement
  }

}
