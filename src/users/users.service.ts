import { Injectable, NotFoundException } from '@nestjs/common';
import { Users } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './update-user.dto';

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
    return await this.userModel.create({
      username,
      password: hashedPassword,
      role,
    });
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await Users.findByPk(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    // Update user properties
    await user.update(updateUserDto);
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    const user = await Users.findByPk(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    await user.destroy(); // Delete the user
  }

  async findUserByEmail(username: string): Promise<User | null> {
    return this.userModel.findOne({ where: { username } });
  }

  async getAllUsers(): Promise<User[]> {
    return Users.findAll(); // Fetch all users
  }

  async getUser(id: string): Promise<User> {
    const user = await Users.findByPk(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }
}
