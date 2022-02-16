import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Owner } from 'src/owners/entities/owner.entity';
import { CreatePetInput } from './dto/create-pet.input';
import { Pet } from './entities/pet.entity';
import { PetsService } from './pets.service';

@Resolver(() => Pet)
export class PetsResolver {
  constructor(private petService: PetsService) {}

  // QUERIES
  @Query(() => Pet, { name: 'pet' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Pet> {
    return this.petService.findOne(id);
  }

  @Query(() => [Pet], { name: 'pets' })
  findAll(): Promise<Pet[]> {
    return this.petService.findAll();
  }

  // MUTATIONS
  @Mutation(() => Pet, { name: 'createPet' })
  create(@Args('createPetInput') createPetInput: CreatePetInput): Promise<Pet> {
    return this.petService.create(createPetInput);
  }

  @Mutation(() => Pet, { name: 'deletePet' })
  remove(@Args('id', { type: () => Int }) id: number): Promise<Pet> {
    return this.petService.remove(id);
  }

  // RESOLVE SUB-FIELDS
  @ResolveField(() => Owner)
  owner(@Parent() pet: Pet): Promise<Owner> {
    return this.petService.getOwner(pet.ownerId);
  }
}
