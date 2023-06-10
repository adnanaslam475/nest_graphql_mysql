import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  // NotFoundException,
} from '@nestjs/common';
const accountSid = 'AC1c89783c6bf0117f8f3ee5f5f9cc59ba';

const authToken = '9a5648d890bb19e82187594240ff5152';
const client = require('twilio')(accountSid, authToken);
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
// import { User } from 'src/users/entities/user.entity';
// import { Repository } from 'typeorm';
import { LoginUserInput } from './dto/login.user-input';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    // private jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        delete user.password;
        // const access_token = this.jwtService.sign({
        //   username: user.email,
        //   sub: user.id,
        // });
        return { ...user, };
      }
    }
    return null;
  }

  // async generateUserCredentials(user: User) {
  //   try {
  //     // const payload = {
  //     //   email: user.email,
  //     //   sub: user.id,
  //     // };
  //     return {
  //       // access_token: this.jwtService.sign(payload),
  //     };
  //   } catch (e) {
  //     console.log('', e);
  //   }
  // }

  async loginUser({ email, password }: LoginUserInput) {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new BadRequestException(`User doesnt exist`);
    }
    if (password !== user.password) {
      throw new BadRequestException(`Email or password are invalid`);
    } else {
      let otp = Math.floor(100000 + Math.random() * 900000)
      client.messages
        .create({
          body: `${otp} is your verification code from Airbytes. Thank you for using our services`,
          messagingServiceSid: process.env.MSG_SERVICE_ID,
          to: user.phone,
        })
        .then(async message => {
          console.log('OTP sent--->', message.sid)
        })
        .done();
      await this.usersService.saveOtp({ otp: otp.toString(), email, });
      return { ...user, message: 'OTP has been sent' };

    }
  }
}
