import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePersonInput {
  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  phoneNumber: string;
}
