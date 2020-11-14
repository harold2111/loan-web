import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Client } from '../../models/Client';
import { ClientService } from '../../services/client.service';
import { Address } from '../../models/address';
import { Department } from '../../../../shared/model/department';
import { LocationService } from '../../../../shared/services/location.service';
import { City } from '../../../../shared/model/city';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {

  clientForm = this.fb.group({
    id: [0],
    identification: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    telephone1: ['', [Validators.required]],
    telephone2: [''],
    email: ['', [Validators.required, Validators.email]],
    addresses: this.fb.array([])
  });

  departments: Department[];
  cities: City[][] = [];

  isEditMode = false;
  selectedClientId: number;
  clientModel: Client = new Client();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private clientService: ClientService,
    private locationService: LocationService,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.getSelectedIDParameter();
    this.loadDepartments();
    if (this.isEditMode) {
      this.clientService.getClientById(this.selectedClientId).subscribe((client) => {
        this.fillFormFromClient(client);
      });
    } else {
      this.addAddress();
    }
  }

  private fillFormFromClient(client: Client): void {
    this.clientModel = client;
    this.id.setValue(client.id);
    this.identification.setValue(client.identification);
    this.firstName.setValue(client.firstName);
    this.lastName.setValue(client.lastName);
    this.telephone1.setValue(client.telephone1);
    this.telephone2.setValue(client.telephone2);
    this.email.setValue(client.email);
    const clientAddresses = client.addresses;
    for (let index = 0; index < clientAddresses.length; index++) {
      const address = clientAddresses[index];
      this.addAddress();
      this.addresses.controls[index].get('id').setValue(address.id);
      this.addresses.controls[index].get('streetAddress').setValue(address.streetAddress);
      this.addresses.controls[index].get('departmentID').setValue(address.departmentID);
      this.addresses.controls[index].get('cityID').setValue(address.cityID);
      this.locationService.getCitiesByDepartmentID(address.departmentID).subscribe(cities => {
        this.cities[index] = cities;
      });
    }
  }

  getSelectedIDParameter(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      if (id != null) {
        this.isEditMode = true;
        this.selectedClientId = +id;
      }
    });
  }

  addAddress(): void {
    const fg = this.fb.group({
      id: [0],
      streetAddress: ['', Validators.required],
      departmentID: [0, Validators.required],
      cityID: [0, Validators.required]
    });
    this.addresses.push(fg);
  }

  removeAddress(index: number): void {
    this.addresses.removeAt(index);
  }

  loadDepartments(): void {
    this.locationService.getDepartments().subscribe(departments => {
      this.departments = departments;
    });
  }

  changeDepartment(index: number): void {
    let departmentId: number;
    if (this.addresses.controls.length > index) {
      departmentId = this.addresses.controls[index].get('departmentID').value;
    }
    console.log(`Selected DepartmentId: ${departmentId}`);
    this.locationService.getCitiesByDepartmentID(departmentId).subscribe(cities => {
      this.cities[index] = cities;
    });
  }

  submit(): void {
    console.log(`clientForm: ${JSON.stringify(this.clientForm.value)}`);
    Object.assign(this.clientModel, this.clientForm.value);
    console.log(`clientModel: ${JSON.stringify(this.clientModel)}`);
    if (this.isEditMode) {
      this.clientService.editClient(this.clientModel.id, this.clientModel).subscribe(client => {
        this.location.back();
      });
    } else {
      this.clientService.createClient(this.clientModel).subscribe(client => {
        this.location.back();
      });
    }
  }

  cancel(): void {
    this.location.back();
  }

  // ERROR HANDLING
  isValidField(field: string): boolean {
    return !this.clientForm.get(field).valid;
  }

  getErrorMessage(field: string): string {
    const fieldControl = this.clientForm.get(field);
    if (fieldControl.errors.required) {
      return 'Un valor es requerido';
    } else if (fieldControl.hasError('email')) {
      return 'Email no es valido';
    } else {
      return 'Valor no es valido';
    }
  }

  // GETTERS
  get id(): FormControl {
    return this.clientForm.get('id') as FormControl;
  }

  get identification(): FormControl {
    return this.clientForm.get('identification') as FormControl;
  }

  get firstName(): FormControl {
    return this.clientForm.get('firstName') as FormControl;
  }

  get lastName(): FormControl {
    return this.clientForm.get('lastName') as FormControl;
  }

  get telephone1(): FormControl {
    return this.clientForm.get('telephone1') as FormControl;
  }

  get telephone2(): FormControl {
    return this.clientForm.get('telephone2') as FormControl;
  }

  get email(): FormControl {
    return this.clientForm.get('email') as FormControl;
  }

  get addresses(): FormArray {
    return this.clientForm.get('addresses') as FormArray;
  }

}
