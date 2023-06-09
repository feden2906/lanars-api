import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CreatedUpdatedDateModel } from './_created-updated-date.model';
import { ImageEntity } from './image.entity';
import { UserEntity } from './user.entity';

@Entity('portfolio')
export class PortfolioEntity extends CreatedUpdatedDateModel {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column('text', { nullable: false })
  name: string;

  @Column('text', { nullable: false })
  description: string;

  @OneToMany(() => ImageEntity, (entity) => entity.portfolio)
  images: ImageEntity;

  @ManyToOne(() => UserEntity, (entity) => entity.portfolios, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;
}
