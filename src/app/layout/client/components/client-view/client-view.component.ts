import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/Client';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { LocationService } from '../../../shared/services/location.service';
import { Address } from '../../models/address';

@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.scss']
})
export class ClientViewComponent implements OnInit {

  displayedColumns = ['streetAddress', 'city', 'options'];

  selectedClientdID: number;
  clientModel: Client = new Client();
  addressesModel: Address[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService,
    private locationService: LocationService
  ) { }

  ngOnInit() {
    this.getSelectedClientIDParameter();
    this.clientService.getClientById(this.selectedClientdID).subscribe((client) => {
      this.clientModel = client;
    });
  }

  getSelectedClientIDParameter() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      if (id != null) {
        this.selectedClientdID = +id;
      }
    });
  }

  onEditAddress(addressID: number): void {
    this.router.navigate(['/client-address-form', { id: this.selectedClientdID, addressID: addressID }]);
  }

  onCreateAddress() {
    this.router.navigate(['/client-address-form', { id: this.selectedClientdID }]);
  }

}
