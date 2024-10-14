import { Injectable } from '@nestjs/common';

@Injectable()
export class BooksService {
  findAll(){
    return Promise.resolve([]);
  }
}
