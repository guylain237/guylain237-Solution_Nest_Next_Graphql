import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AnimalService } from './animal.service';
import { Animal } from './entities/animal.entity';
import { CreateAnimalInput } from './dto/create-animal.input';
import { UpdateAnimalInput } from './dto/update-animal.input';

@Resolver(() => Animal)
export class AnimalResolver {
  constructor(private readonly animalService: AnimalService) {}

  // Resolver pour créer un animal
  @Mutation(() => Animal)
  async createAnimal(
    @Args('createAnimalInput') createAnimalInput: CreateAnimalInput,
  ): Promise<Animal> {
    return this.animalService.create(createAnimalInput);
  }

  // Resolver pour récupérer tous les animaux
  @Query(() => [Animal], { nullable: true })
  getAnimal() {
    return this.animalService.getAnimalService();
  }

  // Resolver pour récupérer un animal par son ID
  @Query(() => Animal)
  getAnimalById(@Args('id', { type: () => Int }) id: number) {
    return this.animalService.getAnimalByIdService(id);
  }

  // Resolver pour mettre à jour un animal par son ID
  @Mutation(() => Animal)
  async updateAnimal(
    @Args('updateAnimalInput') updateAnimalInput: UpdateAnimalInput,
  ): Promise<Animal> {
    return this.animalService.updateAnimalService(
      updateAnimalInput.id,
      updateAnimalInput,
    );
  }

  // Resolver pour supprimer un animal par son ID
  @Mutation(() => String)
  removeAnimal(@Args('id', { type: () => Int }) id: number) {
    return this.animalService.removeAnimalService(id);
  }

  // Résolveur pour obtenir l'animal le plus agé
  @Query(() => Animal, { name: 'getOldAnimal' })
  async getOldAnimal(): Promise<Animal> {
    return await this.animalService.getOldAnimalService();
  }

  // Résolveur pour obtenir l'espèce la mieux représentée
  @Query(() => String)
  async getMostSpecies() {
    try {
      const result = await this.animalService.getMostSpecies();
      return `L'espèce la mieux représentée est: ${result.species}, avec un total de :  ${result.count} .`;
    } catch (error) {
      throw new Error(
        "Erreur lors de la récupération de l'espèce la mieux représentée.",
      );
    }
  }
}
