export class CondoModel {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;

  constructor(
    id: string,
    name: string,
    address: string,
    city: string,
    state: string,
    zipCode: string
  ) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.city = city;
    this.state = state;
    this.zipCode = zipCode;
  }

  static constructorEmpty(): CondoModel {
    return new CondoModel('', '', '', '', '', '');
  }
}
