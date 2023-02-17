import { createParamDecorator } from '@nestjs/common';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('rowid')
  id: string;

  @Column()
  profile_Image: string;

  @Column()
  email: string;

  @Column()
  password: number;

  @Column({ default: true })
  isActive: boolean;
}
