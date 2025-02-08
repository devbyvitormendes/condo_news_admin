import { ContactType } from "./enums/contact_type.enum";

export class ContactModel {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: ContactType;
  condoId: string;

  constructor(
    id: string,
    name: string,
    email: string,
    phone: string,
    type: ContactType,
    condoId: string,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.type = type;
    this.condoId = condoId;
  }
}
