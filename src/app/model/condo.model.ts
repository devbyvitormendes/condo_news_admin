import { ContactModel } from "./contact.model";


export class CondoModel {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  contact: ContactModel[];
  condoPhone: string;
  condoEmail: string;

  constructor(
    id: string,
    name: string,
    address: string,
    city: string,
    state: string,
    zipCode: string,
    contact: ContactModel[],
    condoPhone: string,
    condoEmail: string,
  ) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.city = city;
    this.state = state;
    this.contact = contact;
    this.zipCode = zipCode;
    this.condoPhone = condoPhone;
    this.condoEmail = condoEmail;
  }

  static constructorEmpty(): CondoModel {
    return new CondoModel('', '', '', '', '', '', [], '', '');
  }
}
