import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CreatedUpdatedDateModel } from './_created-updated-date.model';
import { ImageEntity } from './image.entity';
import { UserEntity } from './user.entity';

@Entity('comment')
export class CommentEntity extends CreatedUpdatedDateModel {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column('text', { nullable: false })
  title: string;

  @Column('text', { nullable: false })
  description: string;

  @ManyToOne(() => ImageEntity, (entity) => entity.comments, {
    onDelete: 'CASCADE',
  })
  image: ImageEntity;

  @ManyToOne(() => UserEntity, (entity) => entity.comments, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;
}
