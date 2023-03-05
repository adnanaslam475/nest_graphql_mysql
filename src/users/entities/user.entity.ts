import { ObjectType, Field, Int } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
import { IsEmail } from 'class-validator';

import {
  BeforeInsert,
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { nullable: true, description: 'id of the user' })
  userId: number;

  @IsEmail()
  @Column({ unique: true, nullable: true })
  @Field(() => String, { nullable: true, description: 'email of the user' })
  email: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true, description: 'role of the user' })
  password: string;

  @Column({
    default: '',
    nullable: true,
  })
  @Field(() => String, { nullable: true, description: 'tokens of the user' })
  access_token?: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(
      this.password,
      Number(process.env.HASH_SALT),
    );
  }
}
