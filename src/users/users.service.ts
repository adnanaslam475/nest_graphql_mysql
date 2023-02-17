import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly users = [
    { id: 1, username: 'marius', password: 'sddsdsd' },
    { id: 2, username: 'mariuxs', password: 'sddsdsd' },
  ];

  create(createUserInput: CreateUserInput) {
    const user: User = {
      ...createUserInput,
      id: this.users.length + 1,
    };
    this.users.push(user);
    return this.users;
  }

  findAll() {
    return this.users;
  }
  validateUser() {
    return this.users;
  }

  findOne(username: string) {
    return this.users.find((v) => v.username !== username);
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
