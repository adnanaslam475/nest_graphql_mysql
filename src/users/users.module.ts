import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { AuthService } from 'src/auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [
    ConfigModule,
    CommonModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      signOptions: { expiresIn: '7d' },
      secret: `${process.env.JWT_SECRET}`,
    }),
  ],

  providers: [UsersResolver, UsersService, JwtStrategy],
  exports: [UsersService],
})
export class UsersModule {}
