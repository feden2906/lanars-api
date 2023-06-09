import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import {
  lowerCaseTransformer,
  passwordHashTransformer,
} from '../../common/helpers';
import { CreatedUpdatedDateModel } from './_created-updated-date.model';
import { CommentEntity } from './comment.entity';
import { PortfolioEntity } from './portfolio.entity';

@Entity('user')
export class UserEntity extends CreatedUpdatedDateModel {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column('text', { nullable: false })
  firstName: string;

  @Column('text', { nullable: false })
  lastName: string;

  @Column('text', {
    unique: true,
    nullable: false,
    transformer: [lowerCaseTransformer],
  })
  email: string;

  @Column('text', {
    select: false,
    nullable: true,
    transformer: [passwordHashTransformer],
  })
  password?: string;

  @OneToMany(() => PortfolioEntity, (entity) => entity.user)
  portfolios: PortfolioEntity[];

  @OneToMany(() => CommentEntity, (entity) => entity.user)
  comments: CommentEntity;
}
