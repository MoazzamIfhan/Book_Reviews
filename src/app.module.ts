import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456789',
      database: 'book_review',
      models: [], // Add your models here, e.g., [User, Book]
      autoLoadModels: true, // Automatically load models to the database
      synchronize: true, // Use cautiously: true in dev, false in prod
    }),
    ConfigModule.forRoot({
      isGlobal: true,  // Makes ConfigModule global (available in all modules)
      envFilePath: 'src/.env',  // Specify the path to your environment file
    }),
    BooksModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
