import {
  BadRequestException,
  forwardRef,
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
// @UseGuards(JwtAuthGuard)
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findAll(): Promise<Array<User>> {
    // try {
    //   return await this.userRepository.find();
    // } catch (error) {
    //   throw new HttpException(
    //     {
    //       status: '500',
    //       error: 'User Alreadyx exist',
    //     },
    //     400,
    //     {
    //       cause: error,
    //     },
    //   );
    // }
    return await this.userRepository.find();
  }

  async create(createUserInput: CreateUserInput) {
    try {
      const user = this.userRepository.create(createUserInput);
      return await this.userRepository.save(user);
    } catch (error) {
      throw new HttpException(
        {
          status: '500',
          error: 'User Already exist',
        },
        400,
        {
          cause: error,
        },
      );
    }
  }

  async findOne(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User ${email} nots found`);
    }
    return user;
  }

  async update(
    userId: number,
    updateUserInput: UpdateUserInput,
  ): Promise<User> {
    const user = await this.userRepository.preload({
      userId,
      ...updateUserInput,
    });
    if (!user) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return this.userRepository.save(user);
  }

  async remove(userId: string): Promise<User> {
    const user = await this.findOne(userId);
    await this.userRepository.remove(user);
    return user;
  }
}
