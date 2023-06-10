import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class otpUserInput extends PartialType(CreateUserInput) {
    @Field(() => String)
    otp: string;

    @Field(() => String)
    email: string;
}
