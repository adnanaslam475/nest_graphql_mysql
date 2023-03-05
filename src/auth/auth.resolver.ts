import { Post, UseGuards, createParamDecorator, Query } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
// import { CreateUserInput } from 'src/users/dto/create-user.input';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { GqlAuthGuard } from './dto/gql-auth-guard';
import { LoggedUserOutput } from './dto/logged-user.output';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login.user-input';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  loginUser(
    @Args('loginUserInput') { email, password }: LoginUserInput,
    @Context() context,
  ) {
    return this.authService.loginUser({ email, password });
  }

  // @Mutation(() => User)
  // signup(
  //   @Args('createUserInput') createUserInput: CreateUserInput,
  //   @Context() context,
  // ) {
  //   return this.authService.signup(createUserInput);
  // }
}
