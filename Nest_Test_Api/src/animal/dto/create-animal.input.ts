import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAnimalInput {
  @Field()
  name: string;

  @Field(() => Date, { nullable: true })
  dateOfBirth: Date;

  @Field()
  species: string;

  @Field({ nullable: true })
  breed: string;

  @Field({ nullable: true })
  color: string;

  @Field()
  weight: number;

  @Field(() => Int, { nullable: true })
  ownerId: number;
}
