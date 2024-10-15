import {
  Controller,
  Get,
  UseGuards,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';
import { UpdateBookDto } from './update-book.dto';
import { User } from '../users/users.service';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin, Role.User) // Only Admin and Editor can access this route
  findAllBooks() {
    return this.booksService.getAllBooks();
  }

  @Post('AddBook')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin) // Only Admin can create books
  async createBook(
    @Body('title') title: string,
    @Body('text') text: string,
    @Body('publicationDate') publicationDate: string,
    @Body('bookCover') image: Blob,
  ): Promise<any> {
    const Book = await this.booksService.AddBook(title, text, publicationDate);
    return {
      message: 'Book successfully Added!',
      userId: Book.id,
    };
  }

  @Put(':id')
  // @UseGuards(RolesGuard)
  // @Roles(Role.Admin)
  async updateBook(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.booksService.updateBook(id, updateBookDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  async deleteBook(@Param('id') id: string) {
    return this.booksService.deleteBook(id);
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return this.booksService.getBook(id);
  }
}
