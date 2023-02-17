import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginUserInput } from './dto/login.user-input';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validate(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (user && user.password == password) {
      const { password, ...res } = user;
      return res;
    }
    return null;
  }

  async login(loginUserInput: LoginUserInput): Promise<any> {
    const user = await this.usersService.findOne(loginUserInput.username);
    const { password, ...rest } = user;
    return {
      access_token: this.jwtService.sign({
        username: user.username,
        id: user.id,
      }),
      user: rest,
    };
  }
}
