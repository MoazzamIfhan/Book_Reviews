import { forwardRef, Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Book } from './books.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [SequelizeModule.forFeature([Book]), forwardRef(() => AuthModule)],
  providers: [BooksService],
  controllers: [BooksController],
  exports: [BooksService]
})
export class BooksModule {}
