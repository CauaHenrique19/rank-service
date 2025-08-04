import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { RankModel } from '@rank-service/domain/entities';
import { ColumnNumericTransformer } from '@rank-service/infra/orm/transformers';

@Entity({ name: 'tb_rank' })
export class Rank implements RankModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('integer', {
    name: 'initial_pontuation',
    transformer: new ColumnNumericTransformer(),
  })
  initialPontuation: number;

  @Column('integer', {
    name: 'final_pontuation',
    transformer: new ColumnNumericTransformer(),
  })
  finalPontuation: number;

  @Column()
  color: string;

  @Column()
  icon: string;

  @Column({ name: 'created_at' })
  createdAt: Date;
}
