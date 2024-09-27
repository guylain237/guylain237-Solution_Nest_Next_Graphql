import { forwardRef, Module } from '@nestjs/common';
import { AnimalService } from './animal.service';
import { AnimalResolver } from './animal.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from './entities/animal.entity';
import { PersonModule } from 'src/person/person.module';

@Module({
  imports: [TypeOrmModule.forFeature([Animal]), forwardRef(() => PersonModule)],
  providers: [AnimalResolver, AnimalService],
  exports: [TypeOrmModule],
})
export class AnimalModule {}
