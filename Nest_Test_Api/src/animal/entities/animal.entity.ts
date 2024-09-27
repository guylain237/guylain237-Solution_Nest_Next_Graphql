import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Person } from 'src/person/entities/person.entity';

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'animal' })
export class Animal {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => Date)
  @Column({ type: 'datetime' })
  dateOfBirth: Date;

  @Field()
  @Column()
  species: string;

  @Field()
  @Column()
  breed: string;

  @Field({ nullable: true })
  @Column()
  color: string;

  @Field()
  @Column()
  weight: number;

  @Field(() => Person, { nullable: true })
  @ManyToOne(() => Person, (person) => person.animals, { eager: true })
  owner: Person;
}
