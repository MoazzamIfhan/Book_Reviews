import { Injectable } from '@nestjs/common';

export type User = any;  // Define a more specific type or interface based on your data schema

@Injectable()
export class UsersService {
    private readonly users = [
        {
            userId: 1,
            username: 'john',
            password: '$2b$10$E/wJZl5tbnNIl.P9aCTEZO/uQ.4hIZAYY/jSX7LEcICsc9grR3qqu',  // This should be a bcrypt hash
        },
        {
            userId: 2,
            username: 'jane',
            password: '$2b$10$kkksl5tbnNIl.P9aCTEZO/uhN/hIzKAYY/jSL7LEcICsc9grR3qqu',
        },
    ];

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
}
