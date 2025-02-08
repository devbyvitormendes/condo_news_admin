export class ResidentModel {
    id: string;
    name: string;
    email: string;
    cpf: string;
    phone: string;
    apartment: string

    constructor(
        id: string,
        name: string,
        email: string,
        cpf: string, 
        phone: string,
        apartment: string,
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.cpf = cpf;
        this.phone = phone;
        this.apartment = apartment;
    }
  
    static constructorEmpty(): ResidentModel {
      return new ResidentModel('', '', '', '', '', '');
    }
  
  }
  