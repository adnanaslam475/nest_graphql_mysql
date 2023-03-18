import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// import { CurrentUser } from './user.decorator.graphql';
import { UpdateUserInput } from './dto/update-user.input';
// import { GqlAuthGuard } from 'src/auth/dto/gql-auth-guard';
// import { LoggedUserOutput } from 'src/auth/dto/logged-user.output';
// import { LoginUserInput } from 'src/auth/dto/login.user-input';

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
    console.log('User==========');
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
  // @UseInterceptors(OnlySameUserByIdAllowed)
  @Mutation(() => User)
  updateUser(
    // @Args('id', { type: () => Int }) id: number,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.update(updateUserInput.userId, updateUserInput);
  }
}
