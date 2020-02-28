import { Address } from './address';

export class Client {
  id: number;
  identification: string;
  firstName: string;
  lastName: string;
  telephone1: string;
  telephone2: string;
  email: string;
  addresses: Address[];
}
