import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Owner } from 'src/owners/entities/owner.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Pet {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  type?: string;

  @Column()
  @Field(() => Int)
  ownerId: number;

  // In this case, when i'll delete an owner, all the related pets will be deleted
  @ManyToOne(() => Owner, (owner) => owner.pets, {
    cascade: ['remove'],
    onDelete: 'CASCADE',
  })
  @Field(() => Owner)
  owner: Owner;
}
