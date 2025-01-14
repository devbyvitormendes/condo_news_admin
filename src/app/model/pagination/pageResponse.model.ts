export class PageResponseModel<T> {
  content: T[];
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;

  constructor(
    content: T[],
    number: number,
    size: number,
    totalElements: number,
    totalPages: number,
    last: boolean
  ) {
    this.content = content;
    this.number = number;
    this.size = size;
    this.totalElements = totalElements;
    this.totalPages = totalPages;
    this.last = last;
  }

}
