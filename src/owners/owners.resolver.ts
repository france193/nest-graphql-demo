import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { OwnersService } from './owners.service';
import { Owner } from './entities/owner.entity';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { PetsService } from 'src/pets/pets.service';
import { Pet } from 'src/pets/entities/pet.entity';

@Resolver(() => Owner)
export class OwnersResolver {
  private iAmDeleting = false;
  private petsDeleted = [];

  constructor(
    private readonly ownersService: OwnersService,
    private readonly petsService: PetsService,
  ) {}

  // QUERIES
  @Query(() => Owner, { name: 'owner' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Owner> {
    return this.ownersService.findOne(id);
  }

  @Query(() => [Owner], { name: 'owners' })
  findAll(): Promise<Owner[]> {
    return this.ownersService.findAll();
  }

  // MUTATIONS
  @Mutation(() => Owner, { name: 'createOwner' })
  create(
    @Args('createOwnerInput') createOwnerInput: CreateOwnerInput,
  ): Promise<Owner> {
    return this.ownersService.create(createOwnerInput);
  }

  @Mutation(() => Owner, { name: 'updateOwner' })
  update(
    @Args('updateOwnerInput') updateOwnerInput: UpdateOwnerInput,
  ): Promise<Owner> {
    return this.ownersService.update(updateOwnerInput.id, updateOwnerInput);
  }

  @Mutation(() => Owner, { name: 'deleteOwner' })
  async remove(@Args('id', { type: () => Int }) id: number): Promise<Owner> {
    this.petsDeleted = await this.petsService.findPetByOwner(id);
    this.iAmDeleting = true;

    // return all deleted data
    return this.ownersService.remove(id);
  }

  //RESOLVE SUB-FIELDS
  @ResolveField(() => [Pet])
  pets(@Parent() owner: Owner): Promise<Pet[]> | Pet[] {
    if (this.iAmDeleting) {
      const pets = this.petsDeleted;
      this.iAmDeleting = false;
      this.petsDeleted = [];
      return pets;
    } else {
      return this.petsService.findPetByOwner(owner.id);
    }
  }
}
