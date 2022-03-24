import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOwnerInput } from './dto/create-owner.input';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner) private ownersRepository: Repository<Owner>,
  ) {}

  // CREATE
  async create(createOwnerInput: CreateOwnerInput): Promise<Owner> {
    const newOwner = this.ownersRepository.create(createOwnerInput);
    return this.ownersRepository.save(newOwner);
  }

  // READ
  async findAll(): Promise<Owner[]> {
    return this.ownersRepository.find();
  }

  async findOne(id: number): Promise<Owner> {
    return this.ownersRepository.findOneOrFail(id);
  }

  // UPDATE
  async update(id: number, attrs: Partial<Owner>): Promise<Owner> {
    const owner = await this.findOne(id);

    if (!owner) {
      throw new NotFoundException('owner not found');
    }

    Object.assign(owner, attrs);

    return this.ownersRepository.save(owner);
  }

  // DELETE
  async remove(id: number): Promise<Owner> {
    const owner = await this.findOne(id);
    const toReturn = { ...owner };

    if (!owner) {
      throw new NotFoundException('owner not found');
    }

    // delete owner
    await this.ownersRepository.remove(owner);

    // return deleted
    return toReturn;
  }
}
