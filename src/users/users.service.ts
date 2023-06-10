import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThan, Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

import { sendEmailTechnician } from './nodemailer';
import { PasswordInput } from './dto/p';
import { otpUserInput } from './dto/otp-user-input';
// import { Pagination } from './pagination';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { IPaginated, } from 'src/page-info.response';




@Injectable()
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

  async paginated(options: IPaginationOptions, { start_date, end_date }: any): Promise<IPaginated<User>> {
    const { items, links, meta } = await paginate<User>(this.userRepository, options, {
      where: {
        ...(start_date && end_date && { createdAt: Between(start_date, end_date) }),
      }
    });
    return {
      currentPage: meta.currentPage,
      totalCount: meta.totalItems,
      totalPages: meta.totalPages,
      nodes: items,
      search: { start_date, end_date }
    };
  }

  async create(createUserInput: CreateUserInput) {
    try {
      let password = Math.random().toString(36).slice(2, 10)
      const user = this.userRepository.create({
        ...createUserInput, password
      });
      sendEmailTechnician({
        to: createUserInput.email,
        subject: 'Welcome to Airbytes',
        text: `Hello ${createUserInput.firstname}`,
        html: `<p>Thank you for choosing our services, your temporary password is ${password} . Please use your email address as username.</p>`
      })
      return await this.userRepository.save(user);
    } catch (e) {
      throw new HttpException('Email already exists...', HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    console.log('sfindOneuer------------->', email)
    if (!user) {
      throw new NotFoundException(`User ${email} not found`);
    }
    return user;
  }

  async otpVerifyHandle(payload: otpUserInput): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { email: payload.email } });
      if (!user) {
        throw new NotFoundException(`User ${user.email} not found`);
      }
      if (payload.otp !== user.otp) {
        throw new NotFoundException(`Otp doesnt match`);
      }
      else {
        await this.userRepository.update({ email: payload.email }, {
          otp: '',
        })
        return { ...user }
      }
    } catch (e) {
      throw new NotFoundException(`Something went wrong`);
    }
  }

  async saveOtp({ otp, email }: otpUserInput): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        throw new NotFoundException(`User ${user.email} not found`);
      }
      else {
        await this.userRepository.update({ email }, {
          otp,
          email_verified: true
        });
        return user;
      }
    } catch (e) {
      throw new NotFoundException(`Something went wrongz`);
    }
  }

  async setPassword(payload: PasswordInput): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { email: payload.email } });
      if (!user) {
        throw new NotFoundException(`User ${user.email} not found`);
      }
      if (payload.newpassword !== payload.confirmpassword) {
        throw new NotFoundException(`Password doesnt match`);
      }
      else {
        await this.userRepository.update({ email: payload.email }, {
          password: payload.newpassword,
        });
        return user
      }
    } catch (e) {
      throw new NotFoundException(`Something went wrong`);
    }
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
