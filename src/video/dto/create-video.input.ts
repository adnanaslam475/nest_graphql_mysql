// import { NewVideo } from '../../graphql';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateVideoInput {
  @Field(() => String, { description: 'password of the user' })
  title: string;

  @Field(() => String, { description: 'password of the user' })
  url: string;

  @Field(() => String, { description: 'password of the user' })
  userId: string;
}

