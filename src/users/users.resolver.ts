import { Resolver, Query, Mutation, Args, Int, } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { ParseIntPipe, UseGuards, } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { otpUserInput } from './dto/otp-user-input';
import { PasswordInput } from './dto/p';
import { PaginatedUsers } from './dto/paginate-response.dto';


export const Userz = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }

  @Query(() => [User], { name: 'users' })
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => User, { name: 'user' })
  @UseGuards(JwtAuthGuard)
  findOne(@Args('username', { type: () => String }) username: string) {
    return this.usersService.findOne(username);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => User)
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.update(updateUserInput.userId, updateUserInput);
  }

  @Mutation(() => User)
  otpVerify(
    @Args('otpInput') otpInput: otpUserInput,
  ) {
    return this.usersService.otpVerifyHandle(otpInput);
  }

  @Mutation(() => User)
  setPassword(
    @Args('passwordInput') passwordInput: PasswordInput,
  ) {
    return this.usersService.setPassword(passwordInput);
  }

  @Query(() => PaginatedUsers)
  async users(
    @Args('page', ParseIntPipe) page: number,
    @Args('start_date', { type: () => String, nullable: true }) start_date?: any,
    @Args('end_date', { type: () => String, nullable: true }) end_date?: any
  ): Promise<PaginatedUsers> {
    return await this.usersService.paginated({
      limit: 10,
      page,
    }, { start_date, end_date });
  }
} 