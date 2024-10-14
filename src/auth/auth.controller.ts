import { Controller, forwardRef, Get, Inject, UseGuards } from '@nestjs/common';
import { BooksService } from '../books/books.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private booksService: BooksService) {}

  @Get("findAll")
  @UseGuards(JwtAuthGuard)
  @Inject(forwardRef(() => BooksService))
  findAll() {
    return this.booksService.findAll();
  }
}
