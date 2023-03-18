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
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int, { nullable: true, description: 'id of the user' })
  id: number;


  @Column({ nullable: true })
  @Field(() => String, { nullable: true, description: 'firstname of the user' })
  firstname: string;


  @Column({ nullable: true })
  @Field(() => String, { nullable: true, description: 'lastname of the user' })
  lastname: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true, description: 'otp of the user' })
  otp: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true, description: 'phone of the user' })
  phone: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true, description: 'mac/ip of the user' })
  mac: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true, description: 'role of the user' })
  role: string;

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
