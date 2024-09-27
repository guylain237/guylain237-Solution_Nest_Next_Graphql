import { forwardRef, Global, Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonResolver } from './person.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { AnimalModule } from 'src/animal/animal.module';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Person]), forwardRef(() => AnimalModule)],
  providers: [PersonResolver, PersonService],
  exports: [TypeOrmModule],
})
export class PersonModule {}
