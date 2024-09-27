import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnimalInput } from './dto/create-animal.input';
import { UpdateAnimalInput } from './dto/update-animal.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Animal } from './entities/animal.entity';
import { Repository } from 'typeorm';
import { Person } from 'src/person/entities/person.entity';

@Injectable()
export class AnimalService {
  constructor(
    @InjectRepository(Animal) private animalRepository: Repository<Animal>,
    @InjectRepository(Person) private personRepository: Repository<Person>,
  ) {}

  // Service pour créer un animal
  async create(createAnimalInput: CreateAnimalInput) {
    const { ownerId, ...animalData } = createAnimalInput;
    const newAnimal = this.animalRepository.create(animalData);

    if (ownerId) {
      const owner = await this.personRepository.findOne({
        where: { id: ownerId },
      });
      if (!owner) {
        throw new NotFoundException(
          `L'animal avec l'ID: ${ownerId} n'existe pas.`,
        );
      }
      newAnimal.owner = owner;
    }

    return this.animalRepository.save(newAnimal);
  }

  // Service pour récupérer tous les animaux
  getAnimalService() {
    return this.animalRepository.find();
  }

  // Service pour récupérer un animal par son ID
  getAnimalByIdService(id: number) {
    return this.animalRepository.findOne({ where: { id } });
  }

  // Service pour mettre à jour un animal par son ID
  async updateAnimalService(
    id: number,
    updateAnimalInput: UpdateAnimalInput,
  ): Promise<Animal> {
    const animal = await this.animalRepository.findOne({ where: { id } });

    if (!animal) {
      throw new NotFoundException(`Animal avec l'ID: ${id} n'existe pas.`);
    }

    const { ownerId, ...updateData } = updateAnimalInput;
    Object.assign(animal, updateData);

    if (ownerId) {
      const owner = await this.personRepository.findOne({
        where: { id: ownerId },
      });
      if (!owner) {
        throw new NotFoundException(
          `L'animal avec l'ID: ${ownerId} n'existe pas.`,
        );
      }
      animal.owner = owner;
    }

    return this.animalRepository.save(animal);
  }

  // Service pour supprimer un animal par son ID
  async removeAnimalService(id: number) {
    const animal = await this.animalRepository.findOne({ where: { id } });

    if (!animal) {
      throw new NotFoundException(`Animal avec l'ID: ${id} n'existe pas.`);
    }

    await this.animalRepository.remove(animal);
    return `L'animal avec l'ID: ${id} a été supprimé avec succès.`;
  }

  // Service pour récupérer l'animal le plus vieux
  async getOldAnimalService(): Promise<Animal> {
    const oldestAnimal = await this.animalRepository.find({
      order: { dateOfBirth: 'ASC' },
      take: 1,
    });

    if (!oldestAnimal.length) {
      throw new Error('Aucun animal trouvé.');
    }

    return oldestAnimal[0];
  }

  // Service pour récupérer l'espèce la plus représentée
  async getMostSpecies(): Promise<{
    species: string;
    count: number;
  }> {
    try {
      const result = await this.animalRepository
        .createQueryBuilder('animal')
        .select('animal.species', 'species')
        .addSelect('COUNT(*)', 'count')
        .groupBy('animal.species')
        .orderBy('count', 'DESC')
        .limit(1)
        .getRawOne();

      if (!result) {
        throw new Error('Aucune espèce trouvée.');
      }

      return {
        species: result.species,
        count: Number(result.count),
      };
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de l'espèce la mieux représentée :",
        error,
      );
      throw new Error('Erreur lors de la récupération des données.');
    }
  }
}
