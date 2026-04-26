import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { User } from './user.model';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: '1',
      name: 'Alice',
      email: 'alice@example.com',
    },
    {
      id: '2',
      name: 'Bob',
      email: 'bob@example.com',
    },
  ];

  findAll() {
    return this.users;
  }

  getUserById(id: string) {
    const position = this.findOne(id);
    const user = this.users[position];
    if (user.id === '1') {
      throw new ForbiddenException(`User with id ${id} no tiene acceso`);
    }
    return user;
  }

  create(body: CreateUserDto) {
    const newUser: User = {
      ...body,
      id: (this.users.length + 1).toString(),
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: string, changes: UpdateUserDto) {
    const position = this.findOne(id);
    const currentData = this.users[position];
    const updateUser = {
      ...currentData,
      ...changes,
    };

    this.users[position] = updateUser;
    return updateUser;
  }

  delete(id: string) {
    const position = this.findOne(id);
    this.users.splice(position, 1);
    return { message: 'User deleted' };
  }

  private findOne(id: string) {
    const position = this.users.findIndex((user) => user.id === id);
    if (position === -1) {
      throw new NotFoundException('User not found');
    }
    return position;
  }
}
