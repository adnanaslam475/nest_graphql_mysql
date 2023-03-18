import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { User } from 'src/users/entities/user.entity';
// import { LoginResponse } from './dto/login-response';
// import { Repository } from 'typeorm';
import { LoginUserInput } from './dto/login.user-input';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        delete user.password;
        const access_token = this.jwtService.sign({
          username: user.email,
          sub: user.id,
        });
        // console.log('userbh--', user);
        return { ...user, access_token };
      }
    }
    return null;
  }

  async generateUserCredentials(user: User) {
    try {
      const payload = {
        email: user.email,
        sub: user.id,
      };

      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (e) {
      console.log('cccccc', e);
    }
  }

  async loginUser({ email, password }: LoginUserInput) {
    const user = await this.validateUser(email, password);
    // console.log('user58----------', user);
    if (!user) {
      throw new BadRequestException(`Email or password are invalid`);
    } else {
      return { ...user, token: this.generateUserCredentials(user) };
    }
  }
}
