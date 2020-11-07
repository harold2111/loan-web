import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Client } from '../../models/Client';
import { ClientService } from '../../services/client.service';
import { Address } from '../../models/address';
import { Department } from '../../../../shared/model/department';
import { LocationService } from '../../../../shared/services/location.service';
import { City } from '../../../../shared/model/city';


@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {

  isEditMode = false;

  selecteClientdId: number;
  clientModel: Client = new Client();
  addressesModel: Address[] = [];

  departments: Department[];
  citiesByDeparmentSelected: City[][] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private clientService: ClientService,
    private locationService: LocationService) {
  }

  ngOnInit(): void {
    this.getSelectedIDParameter();
    this.loadDepartments();
    if (this.isEditMode) {
      this.clientService.getClientById(this.selecteClientdId).subscribe((client) => {
        this.clientModel = client;
        this.addressesModel = client.addresses;
        for (let index = 0; index < this.addressesModel.length; index++) {
          this.addressesModel.forEach(element => {
            this.loadCitiesBySelectedDepartment(index);
          });
        }
      });
    } else {
      this.addressesModel.push(new Address());
    }
  }

  loadDepartments(): void {
    this.locationService.getDepartments().subscribe(departments => {
      this.departments = departments;
    });
  }

  getSelectedIDParameter(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      if (id != null) {
        this.isEditMode = true;
        this.selecteClientdId = +id;
      }
    });
  }

  loadCitiesBySelectedDepartment(index: number): void {
    const departmentID = this.addressesModel[index].departmentID;
    this.locationService.getCitiesByDepartmentID(departmentID).subscribe(cities => {
      this.citiesByDeparmentSelected[index] = cities;
    });
  }

  fillCitiesBySelectedDepartment(index: number): void {
    this.addressesModel[index].cityID = 0;
    this.loadCitiesBySelectedDepartment(index);
  }

  onAddAddress(): void {
    this.addressesModel.push(new Address());
  }

  onRemoveddress(index: number): void {
    this.addressesModel.splice(index, 1);
  }

  onCancel(): void {
    this.location.back();
  }

  onSave(): void {
    if (this.isEditMode) {
      this.clientService.editClient(this.selecteClientdId, this.clientModel).subscribe(client => {
        this.location.back();
      });
    } else {
      this.clientModel.addresses = this.addressesModel;
      this.clientService.createClient(this.clientModel).subscribe(client => {
        this.location.back();
      });
    }
  }

}
