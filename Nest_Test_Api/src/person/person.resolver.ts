import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PersonService } from './person.service';
import { Person } from './entities/person.entity';
import { CreatePersonInput } from './dto/create-person.input';
import { UpdatePersonInput } from './dto/update-person.input';
import { Animal } from 'src/animal/entities/animal.entity';

@Resolver(() => Person)
export class PersonResolver {
  constructor(private readonly personService: PersonService) {}

  // Resolver pour créer une personne
  @Mutation(() => Person)
  createPerson(
    @Args('createPersonInput') createPersonInput: CreatePersonInput,
  ) {
    return this.personService.createPersonService(createPersonInput);
  }

  // Resolver pour récupérer toutes les personnes
  @Query(() => [Person])
  getPerson() {
    return this.personService.getPersonService();
  }

  // Resolver pour récupérer une personne par son ID
  @Query(() => Person, { nullable: true })
  getPersonById(@Args('id', { type: () => Int }) id: number) {
    return this.personService.getPersonByIdService(id);
  }

  // Resolver pour mettre à jour une personne par son ID
  @Mutation(() => Person)
  async updatePerson(
    @Args('updatePersonInput') updatePersonInput: UpdatePersonInput,
  ): Promise<Person> {
    return this.personService.updatePersonService(
      updatePersonInput.id,
      updatePersonInput,
    );
  }

  // Resolver pour supprimer une personne par son ID
  @Mutation(() => String)
  async removePerson(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<string> {
    return this.personService.removePersonService(id);
  }

  // Resolver pour récupérer la personne ayant le plus d'animaux
  @Query(() => Person, { name: 'personWithMostAnimals' })
  async getPersonWithMostAnimals() {
    return await this.personService.getPersonWithMostAnimals();
  }
  // Resolver pour récupérer la personne ayant le plus de chats
  @Query(() => String, { name: 'personWithMostCats' })
  async getPersonWithMostCats() {
    try {
      const result = await this.personService.getPersonWithMostCats();

      if (!result) {
        return "Aucune personne avec des chats n'a été trouvée.";
      }

      return `La personne avec le plus de chats est ${result.firstName} ${result.lastName}, avec un total de ${result.cat_count} chats.`;
    } catch (error) {
      throw new Error(
        'Erreur lors de la récupération de la personne avec le plus de chats.',
      );
    }
  }

  // Resolver pour récupérer la personne ayant le plus gros animal
  @Query(() => Animal)
  async WeightAnimalOwner() {
    return await this.personService.getWeightAnimalOwner();
  }
  // Resolver pour récupérer la personne ayant le plus gros animal par groupe d'animaux
  @Query(() => String)
  async personWeightAnimalsGroup() {
    const person = await this.personService.getPersonWeightAnimalsGroup();
    return `La personne avec le groupe d'animaux le plus lourd est ${person.firstName} ${person.lastName}, avec un poids total de ${person.totalWeight} kg.`;
  }
}
