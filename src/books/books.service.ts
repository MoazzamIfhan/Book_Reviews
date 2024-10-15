import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from './books.model';
import { UpdateBookDto } from './update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book)
    private booksModel: typeof Book,
  ) {}

  async AddBook(
    title: string,
    author: string,
    publicationDate: string,
  ): Promise<Book> {
    return await this.booksModel.create({
      title,
      author,
      publicationDate,
    });
  }

  async getAllBooks(): Promise<Book[]> {
    return this.booksModel.findAll(); // Fetch all users
  }

  async updateBook(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await Book.findByPk(id);
    if (!book) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    // Update user properties
    await book.update(updateBookDto);
    return book;
  }

  async deleteBook(id: string): Promise<void> {
    const book = await Book.findByPk(id);
    if (!book) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    await book.destroy(); // Delete the user
  }

  async getBook(id: string): Promise<Book> {
    const book = await Book.findByPk(id);
    if (!book) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return book;
  }

  findAll() {
    return Promise.resolve([]);
  }
}
