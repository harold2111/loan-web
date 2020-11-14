import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';


import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import { Client } from '../../models/Client';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ClientListComponent implements OnInit {
  displayedColumns = ['identification', 'firstName', 'lastName', 'telephone1', 'options'];
  dataSource: MatTableDataSource<Client>;

  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private clientService: ClientService) {}

    ngOnInit(): void {
      this.isLoadingResults = true;
      this.clientService.getClients().subscribe(
        Clients => {
          this.dataSource = new MatTableDataSource(Clients);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.isLoadingResults = false;
        },
        () => {
          this.isLoadingResults = false;
        }
      );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onCreate(): void {
    this.router.navigate(['/client/client-form']);
  }

  onEdit(id: number): void {
    this.router.navigate(['/client/client-form', id]);
  }
}


