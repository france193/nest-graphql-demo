import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from 'src/owners/entities/owner.entity';
import { OwnersService } from 'src/owners/owners.service';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';
import { Pet } from './entities/pet.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet) private petsRepository: Repository<Pet>,
    private ownersService: OwnersService,
  ) {}

  // CREATE
  async create(createPetInput: CreatePetInput): Promise<Pet> {
    const newPet = this.petsRepository.create(createPetInput);
    return this.petsRepository.save(newPet);
  }

  // READ
  async findAll(): Promise<Pet[]> {
    return this.petsRepository.find();
  }

  async findOne(id: number): Promise<Pet> {
    return this.petsRepository.findOneOrFail(id);
  }

  async findPetByOwner(ownerId: number): Promise<Pet[]> {
    return this.petsRepository.find({ ownerId });
  }

  // UPDATE
  async update(id: number, attrs: Partial<Pet>): Promise<Pet> {
    const pet = await this.findOne(id);

    if (!pet) {
      throw new NotFoundException('pet not found');
    }

    Object.assign(pet, attrs);

    return this.petsRepository.save(pet);
  }

  // DELETE
  async remove(id: number): Promise<Pet> {
    const pet = await this.findOne(id);
    const toReturn = { ...pet };

    if (!pet) {
      throw new NotFoundException('pet not found');
    }

    // delete pet
    await this.petsRepository.remove(pet);

    // return deleted data
    return toReturn;
  }

  // OTHER
  async getOwner(ownerId: number): Promise<Owner> {
    return this.ownersService.findOne(ownerId);
  }
}
