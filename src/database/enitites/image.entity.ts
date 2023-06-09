import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CreatedUpdatedDateModel } from './_created-updated-date.model';
import { CommentEntity } from './comment.entity';
import { PortfolioEntity } from './portfolio.entity';

@Entity('image')
export class ImageEntity extends CreatedUpdatedDateModel {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column('text', { nullable: false })
  name: string;

  @Column('text', { nullable: false })
  description: string;

  @Column('text', { nullable: false })
  url: string;

  @OneToMany(() => CommentEntity, (entity) => entity.image)
  comments: CommentEntity;

  @ManyToOne(() => PortfolioEntity, (entity) => entity.images, {
    onDelete: 'CASCADE',
  })
  portfolio: PortfolioEntity;
}
