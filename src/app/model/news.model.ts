export class NewsModel {
    id: string;
    title: string;
    content: string;
    image: string;
    date: string;
    updatedAt: string;
    breaking: boolean;
    idCondo: string;
  
    constructor(
        id: string,
        title: string,
        content: string,
        image: string,
        date: string,
        updatedAt: string,
        breaking: boolean,
        idCondo: string
    ) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.image = image;
        this.date = date;
        this.updatedAt = updatedAt;
        this.breaking = breaking;
        this.idCondo = idCondo;
    }
  
    static constructorEmpty(): NewsModel {
      return new NewsModel('', '', '', '', '', '', false, '');
    }
  
  }
  