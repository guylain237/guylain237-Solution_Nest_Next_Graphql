import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Animal } from 'src/animal/entities/animal.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'person' })
export class Person {
  @Field((type) => Int, { nullable: false })
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  phoneNumber: string;

  @Field(() => [Animal], { nullable: true })
  @OneToMany(() => Animal, (animal) => animal.owner)
  animals: Animal[];
}
