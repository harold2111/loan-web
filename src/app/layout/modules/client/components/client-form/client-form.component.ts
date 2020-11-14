import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Client } from '../../models/Client';
import { ClientService } from '../../services/client.service';
import { Address } from '../../models/address';
import { Department } from '../../../../shared/model/department';
import { LocationService } from '../../../../shared/services/location.service';
import { City } from '../../../../shared/model/city';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {

  clientForm = this.fb.group({
    id: [''],
    identification: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    telephone1: ['', [Validators.required]],
    telephone2: [''],
    email: ['', [Validators.required, Validators.email]],
    addresses: this.fb.array([])
  });

  isEditMode = false;
  selecteClientdId: number;
  clientModel: Client = new Client();
  addressesModel: Address[] = [];
  departments: Department[];
  citiesByDepartmentSelected: City[][] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private clientService: ClientService,
    private locationService: LocationService,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    // this.addAddress();
    // this.getSelectedIDParameter();
    this.loadDepartments();
    /*if (this.isEditMode) {
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
    }*/
  }

  addAddress(): void {
    const fg = this.fb.group({
      // id: [''],
      streetAddress: ['', Validators.required],
      departmentID: ['', Validators.required],
      cityID: ['', Validators.required]
    });
    this.addresses.push(fg);
  }

  get addresses(): FormArray{
    return this.clientForm.get('addresses') as FormArray;
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
      this.citiesByDepartmentSelected[index] = cities;
    });
  }

  changeDepartment(index: number): void {
    if (this.addresses.controls[index] !== null){

    }
    typeof arrayName[index] === 'undefined'
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

  isValidField(field: string): boolean {
    return (this.clientForm.get(field).touched || this.clientForm.get(field).dirty)
    && !this.clientForm.get(field).valid;
  }

  getErrorMessage(field: string): string {
    const fieldControl = this.clientForm.get(field);
    if (fieldControl.errors.required) {
      return 'Un valor es requerido';
    }else if (fieldControl.hasError('email')){
      return 'Email no es valido';
    }else {
      return 'Valor no es valido';
    }
  }

}
