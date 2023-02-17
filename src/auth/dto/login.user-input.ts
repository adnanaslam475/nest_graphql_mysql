import { InputType, Int, Field, ObjectType } from '@nestjs/graphql';

@InputType()
export class LoginUserInput {
  @Field()
  username: string;

  @Field()
  password: string;
}
