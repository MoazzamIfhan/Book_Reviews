import { Injectable } from '@nestjs/common';
import { Users } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';

export type User = any; // Define a more specific type or interface based on your data schema

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private userModel: typeof Users,
  ) {}

  async createUser(
    username: string,
    password: string,
    role: string,
  ): Promise<Users> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userModel.create({
      username,
      password: hashedPassword,
      role,
    });
  }

  // async findOne(username: string): Promise<User | undefined> {
  //   return this.users.find((user) => user.username === username);
  // }
}
