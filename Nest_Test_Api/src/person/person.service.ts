import { Injectable } from '@nestjs/common';
import { CreatePersonInput } from './dto/create-person.input';
import { UpdatePersonInput } from './dto/update-person.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';
import { Animal } from 'src/animal/entities/animal.entity';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person) private repositoryPerson: Repository<Person>,
    @InjectRepository(Animal)
    private readonly animalRepository: Repository<Animal>,
  ) {}

  // service pour créer une personne
  createPersonService(createPersonInput: CreatePersonInput) {
    const newPerson = this.repositoryPerson.create(createPersonInput);
    return this.repositoryPerson.save(newPerson);
  }

  // service pour récupérer toutes les personnes
  getPersonService() {
    return this.repositoryPerson.find({ relations: ['animals'] });
  }

  // service pour récupérer une personne par son ID
  getPersonByIdService(id: number) {
    return this.repositoryPerson.findOne({
      where: { id },
      relations: ['animals'],
    });
  }
  // service pour mettre à jour une personne
  async updatePersonService(id: number, updatePersonInput: UpdatePersonInput) {
    const person = await this.repositoryPerson.findOne({
      where: { id },
      relations: ['animals'],
    });
    if (!person) {
      throw new Error(`La personne avec l'ID: ${id} n'existe pas.`);
    }

    Object.assign(person, updatePersonInput);

    return this.repositoryPerson.save(person);
  }

  // service pour supprimer une personne
  async removePersonService(id: number) {
    const person = await this.repositoryPerson.findOne({ where: { id } });

    if (!person) {
      throw new Error(`personne avec l'ID: ${id} non trouvée.`);
    }

    await this.repositoryPerson.remove(person);

    return `La personne avec l'ID: ${id} a été supprimée avec succès.`;
  }

  // service pour montrer la personne avec le plus d'animaux
  async getPersonWithMostAnimals(): Promise<Person> {
    return this.repositoryPerson
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.animals', 'a')
      .select(['p.id', 'p.firstName', 'p.lastName'])
      .addSelect('COUNT(a.id)', 'animal_count')
      .groupBy('p.id')
      .orderBy('animal_count', 'DESC')
      .limit(1)
      .getOne();
  }
  // Service pour montrer la personne avec le plus de chats
  async getPersonWithMostCats(): Promise<{
    firstName: string;
    lastName: string;
    cat_count: number;
  }> {
    try {
      const result = await this.repositoryPerson
        .createQueryBuilder('p')
        .leftJoin('p.animals', 'a')
        .select(['p.firstName', 'p.lastName'])
        .addSelect('COUNT(a.id)', 'cat_count')
        .where("a.species = 'cat'")
        .groupBy('p.id')
        .orderBy('cat_count', 'DESC')
        .limit(1)
        .getRawOne();

      if (!result) {
        throw new Error("Aucune personne avec des chats n'a été trouvée.");
      }

      return {
        firstName: result.p_firstName,
        lastName: result.p_lastName,
        cat_count: parseInt(result.cat_count, 10),
      };
    } catch (error) {
      throw new Error(
        'Erreur lors de la récupération de la personne avec le plus de chats.',
      );
    }
  }

  // Service pour montrer l'animal le plus gros par rapport à son propriétaire
  async getWeightAnimalOwner() {
    return this.animalRepository
      .createQueryBuilder('animal')
      .leftJoinAndSelect('animal.owner', 'person')
      .orderBy('animal.weight', 'DESC')
      .getOne();
  }

  // Service pour montrer la personne avec le groupe d'animaux le plus lourd
  async getPersonWeightAnimalsGroup(): Promise<{
    firstName: string;
    lastName: string;
    totalWeight: number;
  }> {
    const result = await this.repositoryPerson
      .createQueryBuilder('p')
      .leftJoin('p.animals', 'a')
      .select(['p.firstName', 'p.lastName'])
      .addSelect('SUM(a.weight)', 'totalWeight')
      .groupBy('p.id')
      .orderBy('totalWeight', 'DESC')
      .limit(1)
      .getRawOne();

    return {
      firstName: result.p_firstName,
      lastName: result.p_lastName,
      totalWeight: parseFloat(result.totalWeight),
    };
  }
}
